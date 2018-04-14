import store from '@/store'

export default {
    init: () => {
        
        window.fbAsyncInit = function() {
            
            FB.init({
                appId            : '231206467427240',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v2.12'
            });
        
            FB.getLoginStatus(function(response) {
                console.log(response);
                if (response.status === 'connected') {
                    store.dispatch("setLoggedIn", response.authResponse.userID);
                }
                else {
                    store.dispatch("setLoggedIn", null);
                }
            });
        };
          
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
}
   