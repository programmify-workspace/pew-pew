const userInfo = {
    data: null,
    
    // Fetch user data from server
    async fetchUser() {
        try {
            const response = await fetch('/current');
            if (response.ok) {
                this.data = await response.json();
                return this.data;
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        }
        return null;
    },
    
    // Get current user data
    getUser() {
        return this.data;
    }
};

window.userInfo = userInfo;