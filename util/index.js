"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGaurd = exports.UserDisplayName = void 0;
function UserDisplayName(req) {
    if (req.user) {
        let user = req.user;
        return user.DisplayName.toString();
    }
    return '';
}
exports.UserDisplayName = UserDisplayName;
function AuthGaurd(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}
exports.AuthGaurd = AuthGaurd;
//# sourceMappingURL=index.js.map