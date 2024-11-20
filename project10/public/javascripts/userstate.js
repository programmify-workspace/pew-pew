// userState.js
class UserStateManager {
    constructor() {
        this._userState = null;
        this._listeners = new Set();
    }

    async initialize() {
        try {
            const response = await fetch('/current');
            if (response.ok) {
                const userData = await response.json();
                this._userState = userData;
                this._notifyListeners();
            }
        } catch (error) {
            console.error('Failed to initialize user state:', error);
        }
    }

    subscribe(callback) {
        this._listeners.add(callback);
        // Immediately call with current state
        if (this._userState) {
            callback(this._userState);
        }
        // Return unsubscribe function
        return () => this._listeners.delete(callback);
    }

    _notifyListeners() {
        this._listeners.forEach(listener => listener(this._userState));
    }

    getCurrentUser() {
        return this._userState;
    }

    isAuthenticated() {
        return !!this._userState;
    }
}

// Create a singleton instance
const userState = new UserStateManager();
export default userState;