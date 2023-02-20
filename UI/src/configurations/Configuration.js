const BASE_URL = "http://127.0.0.1:5000";

module.exports={
    SignIn:BASE_URL+"/Authorization/Authorize",
    SignUp:BASE_URL+"/Users/CreateUser",
    ResetPassword:BASE_URL+"/Users/ResetPassword",
    RefreshToken:BASE_URL+"/Authorization/RefreshToken",
    GetCategories:BASE_URL+"/categories/getcategories",
}