Barba.Pjax.start();
Barba.Prefetch.init()


var transitionAnimation = Barba.BaseTransition.extend({
      
 start: function() {

    Promise
      .all([this.newContainerLoading, this.startTransition()])
      .then(this.fadeIn.bind(this));

  },

  startTransition: function() {

    var transitionPromise = new Promise(function(resolve) {
      
     var outTransition = new TimelineMax();
      
        
        outTransition
      
                .to(".title", 1, {y:-50, autoAlpha: 0, ease: Power2.easeOut})
                .set(".color-wipe", {display:'block', y: "100%"}, "-=0.7")
                .staggerFromTo(".color-wipe", 1, {y: "100%"},{y: "-100%", ease: Expo.easeOut}, 0.2, "-=0.7")
        
        .to(".loader", 1, {autoAlpha:1, onComplete: function() {
            resolve();
        }},)
        

        
                .staggerFromTo(".color-wipe", 1, {y: "-100%"},{y: "-200%", ease: Expo.easeIn}, 0.2,"-=0.5")
        .set(".color-wipe", {display:'none'})
        
        
        
    });
      


    return transitionPromise;

  },
    
    


  
           fadeIn: function() {
               
               $(window).scrollTop(0);
               
                var _this = this;
                var $el = $(this.newContainer);

                TweenMax.set($(this.oldContainer), { display: "none" });
                TweenMax.set($el, { visibility: "visible", opacity: 0, });
               
               
                TweenMax.to(".loader", 1, {y:-50, autoAlpha: 0, ease: Expo.easeOut})
               TweenMax.fromTo(".title", 1.5, {y:30, autoAlpha: 0},{delay:0.8, y:0, autoAlpha: 1, ease: Expo.easeOut})

                TweenMax.to($el, 0.1, {
                    opacity: 1,
                    onComplete: function() {
                        _this.done();
                        console.log("done");
                    }
                });
            }
        });


Barba.Pjax.getTransition = function() {
  /**
   * Here you can use your own logic!
   * For example you can use different Transition based on the current page or link...
   */
  return transitionAnimation;

};






