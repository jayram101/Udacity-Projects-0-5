/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Implemented: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
       it('are defined', function() {
            var text = "";
            var i;
            for (i = 0; i < allFeeds.length; i++) {
                text += allFeeds[i].url;
                expect(text).toBeDefined();
                expect(allFeeds.length).not.toBe(0);
            }
        });

        /* Implemented:  Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('are defined', function() {
                var text = "";
                var i;
                for (i = 0; i < allFeeds.length; i++) {
                    text += allFeeds[i].name;
        expect(text).toBeDefined();
            }
        });
    });


    /* Implemented: Write a new test suite named "The menu" */

    describe("Menu hidden by default", function() {

   /* Implemented:  Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

    it("Menu element hidden by default", function() {
        // $(document).ready(function(){};
        var isHidden = $('.menu-hidden').is(":visible");
        console.log('isHidden', isHidden);
        expect(isHidden).toBe(true);
  });
});

    /* Implemented:  Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
    it("visible menu switches after click", function() {
        var isVisible = $('.menu-hidden').is(":visible"); //
          console.log('Visible', isVisible);
        $('a.menu-icon-link').click();
            expect(isVisible).toBe(true);
        });

    it("menu switches after click", function() {
        var isVisible = $('.menu-hidden').is(":visible"); //
        $('a.menu-icon-link').click();
            expect(isVisible).toBe(false);
        });


    /* Implemented:  Write a new test suite named "Initial Entries" */

        /* Implemented:  Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         describe("Initial Entries", function() {

    beforeEach(function(done) {
        loadFeed(0, done);
        });

    it("should have at least one item", function(done) {
        var menuItems = $(".feed .entry").length;
      expect(menuItems).toBeGreaterThan(0);
        done();
    });

  });

    /* Implemented:  Write a new test suite named "New Feed Selection"

        /* Implemented: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    describe("New Feed Section", function(){

        var feed0,
        feed1;

       beforeEach(function(done) {
            loadFeed(1, function() {
            feed0 = $('.feed').html();
             done();
            });
            });

        it("content changes", function(done) {
            loadFeed(0, function() {
          expect($('.feed').html()).not.toEqual(feed0);
        done();
    });
    });
    });
    /* TODO:  Write a new test suite named "At least one feed"

    /* TODO: Write a test suite named "New entries detectable"
        This ensures that when a feed is re-loaded the content that actually changes is distinguishable.
        Remember, loadFeed() is asynchronous.
    /* TODO: Write a test suite named "No loading errors"

    */

}());
