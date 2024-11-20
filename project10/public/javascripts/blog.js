document.addEventListener('DOMContentLoaded', async () => {
    await initializeUserInfo();
    await fetchAllComments(1);
});

const form = document.getElementById('comment-form');
const textarea = form.querySelector('.comment-input');
const blogId = form.querySelector('[name="blogId"]').value;
const cancelButton = form.querySelector('.btn-cancel');

const avatarPlaceholder = "/uploads/avatars/person.png";

async function initializeUserInfo() {
    await window.userInfo.fetchUser();
    updateCommentUI();
}

function updateCommentUI() {
    const user = window.userInfo.getUser();
    const commentForm = document.getElementById('comment-form');
    const avatarImg = commentForm.querySelector('.commenter-avatar');
    
    if (user) {
        avatarImg.src = `/uploads/avatars/${user.avatar}` || avatarPlaceholder;
        avatarImg.alt = `${user.name}'s avatar`;
        textarea.placeholder = `Write a comment as ${user.name}...`;
        commentForm.style.display = 'block';
    } else {
        textarea.placeholder = 'Please login to comment...';
        showMessage("Please login to comment", "info");
    }
}

let currentPage = 1;

async function fetchAllComments(page = 1) {
    try {
        const response = await fetch(`/blog/${blogId}/comments?page=${page}&limit=8`);
        const data = await response.json();
        
        const { comments, pagination } = data;

        const commentsList = document.querySelector('.comments-list');
        commentsList.innerHTML = ''; // Clear existing comments
        
        if (comments.length === 0) {
            commentsList.innerHTML = `<p class='notfound'>No comments yet</p>`;
            return;
        }

        const commentCountElement = document.querySelector('.comment-count');
        commentCountElement.textContent = pagination.totalComments;

        comments.forEach(comment => {
            const commentElement = appendComment(comment, false);
            if (comment.replies && comment.replies.length > 0) {
                const repliesContainer = document.createElement('div');
                repliesContainer.className = 'replies';
                commentElement.querySelector('.comment-content').appendChild(repliesContainer);
                
                comment.replies.forEach(reply => {
                    appendReply(reply, false, repliesContainer);
                });
            }
        });

        // Update pagination controls
        updatePaginationControls(pagination);
    } catch (error) {
        console.error('Error fetching comments:', error);
        showMessage('Failed to load comments', 'error');
    }
}

function updatePaginationControls(pagination) {
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');

    // Update page numbers
    currentPageSpan.textContent = pagination.currentPage;
    totalPagesSpan.textContent = pagination.totalPages;

    // Update button states
    prevButton.disabled = !pagination.hasPrevPage;
    nextButton.disabled = !pagination.hasNextPage;

    // Clear existing event listeners
    prevButton.replaceWith(prevButton.cloneNode(true));
    nextButton.replaceWith(nextButton.cloneNode(true));

    // Add new event listeners
    document.getElementById('prev-page').addEventListener('click', () => {
        if (pagination.hasPrevPage) {
            currentPage--;
            fetchAllComments(currentPage);
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        if (pagination.hasNextPage) {
            currentPage++;
            fetchAllComments(currentPage);
        }
    });
}

function appendComment(comment, isNewComment = true) {
    const commentsList = document.querySelector('.comments-list');
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.dataset.commentId = comment.id || Date.now();

    if (document.querySelector('.notfound')) {
        document.querySelector('.notfound').style.display = 'none';
    }

    const currentUser = window.userInfo.getUser();
    const commentData = isNewComment ? {
        content: comment,
        name: currentUser?.name,
        avatar: currentUser?.avatar || avatarPlaceholder,
        created_at: new Date()
    } : {
        content: comment.content,
        name: comment.name,
        avatar: comment.avatar || avatarPlaceholder,
        created_at: comment.created_at
    };

    commentDiv.innerHTML = `
        <img src="${commentData.avatar}" alt="${commentData.name}'s avatar" class="commenter-avatar">
        <div class="comment-content">
            <div class="comment-header">
                <span class="commenter-name">${commentData.name}</span>
                <span class="comment-time">${formatTimestamp(commentData.created_at)}</span>
            </div>
            <p class="comment-text">${commentData.content}</p>
            <div class="comment-actions">
                <button class="action-btn">
                    <i class="far fa-heart"></i>
                    <span>0</span>
                </button>
                <button class="action-btn reply-btn">
                    <i class="far fa-comment"></i>
                    <span>Reply</span>
                </button>
            </div>
        </div>`;

    if (isNewComment) {
        commentsList.insertBefore(commentDiv, commentsList.firstChild);
        // Create a replies container for new comments
        const repliesContainer = document.createElement('div');
        repliesContainer.className = 'replies';
        commentDiv.querySelector('.comment-content').appendChild(repliesContainer);
    } else {
        commentsList.appendChild(commentDiv);
    }

    // Add reply button event listener
    commentDiv.querySelector('.reply-btn').addEventListener('click', () => {
        if (!currentUser) {
            showMessage('Please login to reply', 'info');
            return;
        }
        
        // Remove existing reply forms
        document.querySelectorAll('.reply-form').forEach(form => form.remove());
        
        const replyForm = createReplyForm(commentDiv.dataset.commentId);
        const repliesContainer = commentDiv.querySelector('.replies') || (() => {
            const container = document.createElement('div');
            container.className = 'replies';
            commentDiv.querySelector('.comment-content').appendChild(container);
            return container;
        })();
        
        repliesContainer.insertBefore(replyForm, repliesContainer.firstChild);
    });

    return commentDiv;
}

function createReplyForm(parentCommentId) {
    console.log('Creating reply form for comment', parentCommentId);

    const currentUser = window.userInfo.getUser();
    const replyForm = document.createElement('form');
    replyForm.className = 'comment-form reply-form';
    
    replyForm.innerHTML = `
        <div class="comment-input-group">
            <img src="${currentUser?.avatar ? `/uploads/avatars/${currentUser.avatar}` : avatarPlaceholder}" 
                 alt="Your avatar" 
                 class="commenter-avatar">
            <input type="hidden" name="parentId" value="${parentCommentId}">
            <input type="hidden" name="blogId" value="${blogId}">
            <textarea 
                placeholder="Write a reply..." 
                class="comment-input reply-input"
                rows="2"
                name="content"
                required
            ></textarea>
        </div>
        <div class="comment-form-actions" style="display: none;">
            <button type="button" class="btn-cancel">Cancel</button>
            <button type="submit" class="btn-submit">Reply</button>
        </div>
    `;

    // Handle textarea focus
    const replyTextarea = replyForm.querySelector('.reply-input');
    const replyFormActions = replyForm.querySelector('.comment-form-actions');

    replyTextarea.addEventListener('focus', () => {
        replyFormActions.style.display = 'flex';
    });

    replyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = replyForm.querySelector('.btn-submit');
        
        if (!replyTextarea.value.trim()) {
            showMessage('Please write a reply', 'error');
            return;
        }

        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';

            const response = await fetch('/comments/reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: replyTextarea.value.trim(),
                    parentId: parentCommentId,
                    blogId: blogId
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to post reply');
            }

            const parentComment = document.querySelector(`[data-comment-id="${parentCommentId}"]`);
            const repliesContainer = parentComment.querySelector('.replies') || (() => {
                const container = document.createElement('div');
                container.className = 'replies';
                parentComment.querySelector('.comment-content').appendChild(container);
                return container;
            })();

            appendReply(result, true, repliesContainer);
            replyForm.remove();
            showMessage('Reply posted successfully!', 'success');
        } catch (error) {
            console.error('Error:', error);
            showMessage(error.message || 'Failed to post reply. Please try again.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Reply';
        }
    });

    // Handle cancel button
    const cancelButton = replyForm.querySelector('.btn-cancel');
    cancelButton.addEventListener('click', () => {
        replyForm.remove();
    });

    return replyForm;
}

// Update the main form event listeners
document.querySelector('.comment-input').addEventListener('focus', function() {
    const mainFormActions = document.querySelector('#comment-form .comment-form-actions');
    if (mainFormActions) {
        mainFormActions.style.display = 'flex';
    }
});

document.querySelector('.btn-cancel').addEventListener('click', function() {
    const mainFormActions = document.querySelector('#comment-form .comment-form-actions');
    document.querySelector('.comment-input').value = '';
    if (mainFormActions) {
        mainFormActions.style.display = 'none';
    }
});

function appendReply(reply, isNewReply = true, repliesContainer) {
    const currentUser = window.userInfo.getUser();
    const replyDiv = document.createElement('div');
    replyDiv.className = 'comment reply';
    
    const replyData = isNewReply ? {
        content: reply.content,
        name: currentUser?.name,
        avatar: currentUser?.avatar ? `/uploads/avatars/${currentUser.avatar}` : avatarPlaceholder,
        created_at: new Date()
    } : reply;

    replyDiv.innerHTML = `
        <img src="${replyData.avatar}" alt="${replyData.name}'s avatar" class="commenter-avatar">
        <div class="comment-content">
            <div class="comment-header">
                <span class="commenter-name">${replyData.name}</span>
                <span class="comment-time">${formatTimestamp(replyData.created_at)}</span>
            </div>
            <p class="comment-text">${replyData.content}</p>
            <div class="comment-actions">
                <button class="action-btn">
                    <i class="far fa-heart"></i>
                    <span>0</span>
                </button>
            </div>
        </div>
    `;

    if (isNewReply) {
        repliesContainer.insertBefore(replyDiv, repliesContainer.firstChild);
    } else {
        repliesContainer.appendChild(replyDiv);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!window.userInfo.getUser()) {
        showMessage('Please login to comment', 'info');
        return;
    }

    const content = textarea.value.trim();
    if (!content) {
        showMessage('Please write a comment', 'error');
        return;
    }

    try {
        const submitButton = form.querySelector('.btn-submit');
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        const response = await fetch('/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content, blogId })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to post comment');
        }

        textarea.value = '';
        form.querySelector('.comment-form-actions').style.display = 'none';
        showMessage('Comment posted successfully!', 'success');
        
        // Refresh the first page of comments after posting
        await fetchAllComments(1);
        currentPage = 1;
        
    } catch (error) {
        console.error('Error:', error);
        showMessage(error.message || 'Failed to post comment. Please try again.', 'error');
    } finally {
        const submitButton = form.querySelector('.btn-submit');
        submitButton.disabled = false;
        submitButton.textContent = 'Comment';
    }
});

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
        return 'Just now';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // Remove any existing messages
    document.querySelectorAll('.message').forEach(msg => msg.remove());
    
    // Insert message after the form
    form.parentNode.insertBefore(messageDiv, form.nextSibling);

    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}