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
                    console.log('Logged in.');

                    FB.api(
                        `/me/friends`,
                        function (response) {
                            console.log(response)
                            if (response && !response.error) {
                                
                            }
                        }
                    );
                }
                else {
                    console.log('FB.login');
                    FB.login(function(response) {
                        console.log(response);
                      }, {scope: 'public_profile,user_friends,user_location,user_birthday,user_likes,user_photos,user_posts,user_tagged_places,user_videos,user_events,user_managed_groups'});
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


   