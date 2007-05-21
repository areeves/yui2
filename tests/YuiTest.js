

YAHOO.namespace("test");

YAHOO.test.YuiTest = (function(){

    //shortcuts
    var Assert /*:Object*/ = YAHOO.util.Assert;
    var UserAction /*:Object*/ = YAHOO.util.UserAction;
    var YUE /*:Object*/ = YAHOO.util.Event;
    var YUD /*:Object*/ = YAHOO.util.Dom;

    //-------------------------------------------------------------------------
    // Generic Event Test Case
    //-------------------------------------------------------------------------
    function GenericEventTestCase(type /*:String*/){
        GenericEventTestCase.superclass.constructor.call(this);
        this.eventType = type;
        this.name = "Event '" + type + "' Tests";
        this.result = null;
        this.element = null;
        this.elementTagName = "div";
    }

    YAHOO.lang.extend(GenericEventTestCase, YAHOO.tool.TestCase, {
    
        //---------------------------------------------------------------------
        // Setup and teardown of test harnesses
        //---------------------------------------------------------------------
        
        /*
         * Sets up several event handlers used to test UserAction mouse events.
         */
        setUp : function() /*:Void*/{
        
            //create the element
            this.element = document.createElement(this.elementTagName);
            document.body.appendChild(this.element);
            
            //reset the result
            this.result = null;
            
            //assign event handler
            YUE.addListener(this.element, this.eventType, this.handleEvent, this, true);
        },
        
        /*
         * Removes event handlers that were used during the test.
         */
        tearDown : function() /*:Void*/{
        
            //remove the element
            document.body.removeChild(this.element);

            //remove event handler
            YUE.removeListener(this.element, this.eventType, this.handleEvent, this, true);
        },
        
        //---------------------------------------------------------------------
        // Event handler
        //---------------------------------------------------------------------
        
        /*
         * Uses to trap and assign the event object for interrogation.
         * @param {Event} event The event object created from the event.
         */
        handleEvent : function(event /*:Event*/) /*:Void*/ {
            this.result = event;
        }
    });
    
    //-------------------------------------------------------------------------
    // MouseButtonEvent Test Case
    //-------------------------------------------------------------------------

    function MouseButtonEventTestCase(type /*:String*/){
        MouseButtonEventTestCase.superclass.constructor.call(this, type);
    }

    YAHOO.lang.extend(MouseButtonEventTestCase, GenericEventTestCase, {
            
        //---------------------------------------------------------------------
        // Tests
        //---------------------------------------------------------------------
                
        /*
         * Tests with default options.
         */
        testDefault : function () /*:Void*/{        
            
            //fire the click event
            UserAction[this.eventType](this.element);

            //test the data coming back
            Assert.isObject(this.result, "No event object created.");
            Assert.areSame(this.element, YUE.getTarget(this.result), "Target is not correct.");
            Assert.areEqual(this.eventType, this.result.type, "Event type is incorrect.");
            Assert.isTrue(this.result.bubbles, "bubbles is incorrect.");
            Assert.isTrue(this.result.cancelable, "Cancelable is incorrect.");
            Assert.areSame(window, this.result.view, "View is incorrect.");
            Assert.areEqual(1, this.result.detail, "Details is incorrect.");
            //Assert.areEqual(0, this.result.button, "Button is incorrect.");
            
        },
        
        /*
         * Tests when using the right mouse button.
         */
        testRightBtn : function () /*:Void*/{        
            
            //fire the click event
            UserAction[this.eventType](this.element, { button: 2 });

            //test the data coming back
            Assert.isObject(this.result, "No event object created.");
            Assert.areSame(this.element, YUE.getTarget(this.result), "Target is not correct.");
            Assert.areEqual(this.eventType, this.result.type, "Event type is incorrect.");
            Assert.isTrue(this.result.bubbles, "bubbles is incorrect.");
            Assert.isTrue(this.result.cancelable, "Cancelable is incorrect.");
            Assert.areSame(window, this.result.view, "View is incorrect.");
            Assert.areEqual(1, this.result.detail, "Details is incorrect.");
            //Assert.areEqual(2, this.result.button, "Button is incorrect.");
        },
        
        /*
         * Tests when using coordinates.
         */
        testCoords : function () /*:Void*/{        
            
            //fire the click event
            UserAction[this.eventType](this.element, { clientX: 100, clientY: 150, screenX: 200, screenY: 250 });

            //test the data coming back
            Assert.isObject(this.result, "No event object created.");
            Assert.areSame(this.element, YUE.getTarget(this.result), "Target is not correct.");
            Assert.areEqual(this.eventType, this.result.type, "Event type is incorrect.");
            Assert.isTrue(this.result.bubbles, "bubbles is incorrect.");
            Assert.isTrue(this.result.cancelable, "Cancelable is incorrect.");
            Assert.areSame(window, this.result.view, "View is incorrect.");
            Assert.areEqual(1, this.result.detail, "Details is incorrect.");
            //Assert.areEqual(0, this.result.button, "Button is incorrect.");
            Assert.areEqual(100, this.result.clientX, "ClientX is incorrect.");
            Assert.areEqual(150, this.result.clientY, "ClientX is incorrect.");
            Assert.areEqual(200, this.result.screenX, "ScreenX is incorrect.");
            Assert.areEqual(250, this.result.screenY, "ScreenY is incorrect.");
        },
        
        /*
         * Tests UserAction.click() when using CTRL key.
         */
        testCtrlKey : function () /*:Void*/{        
            
            //fire the click event
            UserAction[this.eventType](this.element, { ctrlKey: true });

            //test the data coming back
            Assert.isObject(this.result, "No event object created.");
            Assert.areSame(this.element, YUE.getTarget(this.result), "Target is not correct.");
            Assert.areEqual(this.eventType, this.result.type, "Event type is incorrect.");
            Assert.isTrue(this.result.bubbles, "bubbles is incorrect.");
            Assert.isTrue(this.result.cancelable, "Cancelable is incorrect.");
            Assert.areSame(window, this.result.view, "View is incorrect.");
            Assert.areEqual(1, this.result.detail, "Details is incorrect.");
            //Assert.areEqual(0, this.result.button, "Button is incorrect.");
            Assert.isTrue(this.result.ctrlKey, "CtrlKey is incorrect.");
            Assert.isFalse(this.result.altKey, "AltKey is incorrect.");
            Assert.isFalse(this.result.shiftKey, "ShiftKey is incorrect.");
            Assert.isFalse(this.result.metaKey, "MetaKey is incorrect.");
        },
        
        /*
         * Tests when using ALT key.
         */
        testAltKey : function () /*:Void*/{        
            
            //fire the click event
            UserAction[this.eventType](this.element, { altKey: true });

            //test the data coming back
            Assert.isObject(this.result, "No event object created.");
            Assert.areSame(this.element, YUE.getTarget(this.result), "Target is not correct.");
            Assert.areEqual(this.eventType, this.result.type, "Event type is incorrect.");
            Assert.isTrue(this.result.bubbles, "bubbles is incorrect.");
            Assert.isTrue(this.result.cancelable, "Cancelable is incorrect.");
            Assert.areSame(window, this.result.view, "View is incorrect.");
            Assert.areEqual(1, this.result.detail, "Details is incorrect.");
            //Assert.areEqual(0, this.result.button, "Button is incorrect.");
            Assert.isFalse(this.result.ctrlKey, "CtrlKey is incorrect.");
            Assert.isTrue(this.result.altKey, "AltKey is incorrect.");
            Assert.isFalse(this.result.shiftKey, "ShiftKey is incorrect.");
            Assert.isFalse(this.result.metaKey, "MetaKey is incorrect.");
        },
        
        /*
         * Tests when using Shift key.
         */
        testShiftKey : function () /*:Void*/{        
            
            //fire the click event
            UserAction[this.eventType](this.element, { shiftKey: true });

            //test the data coming back
            Assert.isObject(this.result, "No event object created.");
            Assert.areSame(this.element, YUE.getTarget(this.result), "Target is not correct.");
            Assert.areEqual(this.eventType, this.result.type, "Event type is incorrect.");
            Assert.isTrue(this.result.bubbles, "bubbles is incorrect.");
            Assert.isTrue(this.result.cancelable, "Cancelable is incorrect.");
            Assert.areSame(window, this.result.view, "View is incorrect.");
            Assert.areEqual(1, this.result.detail, "Details is incorrect.");
            //Assert.areEqual(0, this.result.button, "Button is incorrect.");
            Assert.isFalse(this.result.ctrlKey, "CtrlKey is incorrect.");
            Assert.isFalse(this.result.altKey, "AltKey is incorrect.");
            Assert.isTrue(this.result.shiftKey, "ShiftKey is incorrect.");
            Assert.isFalse(this.result.metaKey, "MetaKey is incorrect.");
        },
        
        /*
         * Tests when using Meta key.
         */
        testMetaKey : function () /*:Void*/{        
            
            //fire the click event
            UserAction[this.eventType](this.element, { metaKey: true });

            //test the data coming back
            Assert.isObject(this.result, "No event object created.");
            Assert.areSame(this.element, YUE.getTarget(this.result), "Target is not correct.");
            Assert.areEqual(this.eventType, this.result.type, "Event type is incorrect.");
            Assert.isTrue(this.result.bubbles, "bubbles is incorrect.");
            Assert.isTrue(this.result.cancelable, "Cancelable is incorrect.");
            Assert.areSame(window, this.result.view, "View is incorrect.");
            Assert.areEqual(1, this.result.detail, "Details is incorrect.");
            //Assert.areEqual(0, this.result.button, "Button is incorrect.");
            Assert.isFalse(this.result.ctrlKey, "CtrlKey is incorrect.");
            Assert.isFalse(this.result.altKey, "AltKey is incorrect.");
            Assert.isFalse(this.result.shiftKey, "ShiftKey is incorrect.");
            Assert.isTrue(this.result.metaKey, "MetaKey is incorrect.");
        }    
    
    });
    
    //-------------------------------------------------------------------------
    // MouseMovementEvent Test Case
    //-------------------------------------------------------------------------
    
    function MouseMovementEventTestCase(type /*:String*/) {
        MouseMovementEventTestCase.superclass.constructor.call(this,type);    
    }
    
    YAHOO.lang.extend(MouseMovementEventTestCase, MouseButtonEventTestCase, {
    
        /*
         * Tests that the relatedTarget property is correct.
         */
        testRelatedTarget : function () /*:Void*/{
        
            //fire the click event
            UserAction[this.eventType](this.element, { relatedTarget: document.body });

            //test the data coming back
            Assert.isObject(this.result, "No event object created.");
            Assert.areSame(this.element, YUE.getTarget(this.result), "Target is not correct.");
            Assert.areEqual(this.eventType, this.result.type, "Event type is incorrect.");
            Assert.isTrue(this.result.bubbles, "bubbles is incorrect.");
            Assert.isTrue(this.result.cancelable, "Cancelable is incorrect.");
            Assert.areSame(window, this.result.view, "View is incorrect.");
            Assert.areEqual(1, this.result.detail, "Details is incorrect.");
            //Assert.areEqual(0, this.result.button, "Button is incorrect.");
            Assert.isFalse(this.result.ctrlKey, "CtrlKey is incorrect.");
            Assert.isFalse(this.result.altKey, "AltKey is incorrect.");
            Assert.isFalse(this.result.shiftKey, "ShiftKey is incorrect.");
            Assert.isFalse(this.result.metaKey, "MetaKey is incorrect.");        
            Assert.areSame(document.body, YUE.getRelatedTarget(this.result), "RelatedTarget is incorrect.");        
        }
    
    
    });
    

    //-------------------------------------------------------------------------
    // KeyEvent Test Case
    //-------------------------------------------------------------------------
    
    function KeyEventTestCase(type /*:String*/) {
        KeyEventTestCase.superclass.constructor.call(this,type);
    }
    
    YAHOO.lang.extend(KeyEventTestCase, GenericEventTestCase, {
    
        /*
         * Tests that the default properties are correct.
         */
        testDefault : function () /*:Void*/{
        
            //fire the click event
            UserAction[this.eventType](this.element);

            //test the data coming back
            Assert.isObject(this.result, "No event object created.");
            Assert.areSame(this.element, YUE.getTarget(this.result), "Target is not correct.");
            Assert.areEqual(this.eventType, this.result.type, "Event type is incorrect.");
            Assert.isTrue(this.result.bubbles, "bubbles is incorrect.");
            Assert.isTrue(this.result.cancelable, "Cancelable is incorrect.");
            Assert.isFalse(this.result.ctrlKey, "CtrlKey is incorrect.");
            Assert.isFalse(this.result.altKey, "AltKey is incorrect.");
            Assert.isFalse(this.result.shiftKey, "ShiftKey is incorrect.");
            Assert.isFalse(this.result.metaKey, "MetaKey is incorrect.");        
      
        },
        
        /*
         * Tests UserAction.click() when using CTRL key.
         */
        testCtrlKey : function () /*:Void*/{        
            
            //fire the click event
            UserAction[this.eventType](this.element, { ctrlKey: true });

            //test the data coming back
            Assert.isObject(this.result, "No event object created.");
            Assert.areSame(this.element, YUE.getTarget(this.result), "Target is not correct.");
            Assert.areEqual(this.eventType, this.result.type, "Event type is incorrect.");
            Assert.isTrue(this.result.bubbles, "bubbles is incorrect.");
            Assert.isTrue(this.result.cancelable, "Cancelable is incorrect.");
            Assert.isTrue(this.result.ctrlKey, "CtrlKey is incorrect.");
            Assert.isFalse(this.result.altKey, "AltKey is incorrect.");
            Assert.isFalse(this.result.shiftKey, "ShiftKey is incorrect.");
            Assert.isFalse(this.result.metaKey, "MetaKey is incorrect.");
        },
        
        /*
         * Tests when using ALT key.
         */
        testAltKey : function () /*:Void*/{        
            
            //fire the click event
            UserAction[this.eventType](this.element, { altKey: true });

            //test the data coming back
            Assert.isObject(this.result, "No event object created.");
            Assert.areSame(this.element, YUE.getTarget(this.result), "Target is not correct.");
            Assert.areEqual(this.eventType, this.result.type, "Event type is incorrect.");
            Assert.isTrue(this.result.bubbles, "bubbles is incorrect.");
            Assert.isTrue(this.result.cancelable, "Cancelable is incorrect.");
            Assert.isFalse(this.result.ctrlKey, "CtrlKey is incorrect.");
            Assert.isTrue(this.result.altKey, "AltKey is incorrect.");
            Assert.isFalse(this.result.shiftKey, "ShiftKey is incorrect.");
            Assert.isFalse(this.result.metaKey, "MetaKey is incorrect.");
        },
        
        /*
         * Tests when using Shift key.
         */
        testShiftKey : function () /*:Void*/{        
            
            //fire the click event
            UserAction[this.eventType](this.element, { shiftKey: true });

            //test the data coming back
            Assert.isObject(this.result, "No event object created.");
            Assert.areSame(this.element, YUE.getTarget(this.result), "Target is not correct.");
            Assert.areEqual(this.eventType, this.result.type, "Event type is incorrect.");
            Assert.isTrue(this.result.bubbles, "bubbles is incorrect.");
            Assert.isTrue(this.result.cancelable, "Cancelable is incorrect.");
            Assert.isFalse(this.result.ctrlKey, "CtrlKey is incorrect.");
            Assert.isFalse(this.result.altKey, "AltKey is incorrect.");
            Assert.isTrue(this.result.shiftKey, "ShiftKey is incorrect.");
            Assert.isFalse(this.result.metaKey, "MetaKey is incorrect.");
        },
        
        /*
         * Tests when using Meta key.
         */
        testMetaKey : function () /*:Void*/{        
            
            //fire the click event
            UserAction[this.eventType](this.element, { metaKey: true });

            //test the data coming back
            Assert.isObject(this.result, "No event object created.");
            Assert.areSame(this.element, YUE.getTarget(this.result), "Target is not correct.");
            Assert.areEqual(this.eventType, this.result.type, "Event type is incorrect.");
            Assert.isTrue(this.result.bubbles, "bubbles is incorrect.");
            Assert.isTrue(this.result.cancelable, "Cancelable is incorrect.");
            Assert.isFalse(this.result.ctrlKey, "CtrlKey is incorrect.");
            Assert.isFalse(this.result.altKey, "AltKey is incorrect.");
            Assert.isFalse(this.result.shiftKey, "ShiftKey is incorrect.");
            Assert.isTrue(this.result.metaKey, "MetaKey is incorrect.");
        }            
    
    
    });    
    
    //-------------------------------------------------------------------------
    // KeyDirection Test Case
    //-------------------------------------------------------------------------    
    
    function KeyDirectionEventTestCase(type /*:String*/){
        KeyDirectionEventTestCase.superclass.constructor.call(this, type);
    }
    
    YAHOO.lang.extend(KeyDirectionEventTestCase, KeyEventTestCase, {
    
        /*
         * Tests that the default properties are correct.
         */
        testKeyCode : function () /*:Void*/{
        
            //fire the click event
            UserAction[this.eventType](this.element, { keyCode: 97 });

            //test the data coming back
            Assert.isObject(this.result, "No event object created.");
            Assert.areSame(this.element, YUE.getTarget(this.result), "Target is not correct.");
            Assert.areEqual(this.eventType, this.result.type, "Event type is incorrect.");
            Assert.isTrue(this.result.bubbles, "bubbles is incorrect.");
            Assert.isTrue(this.result.cancelable, "Cancelable is incorrect.");
            Assert.isFalse(this.result.ctrlKey, "CtrlKey is incorrect.");
            Assert.isFalse(this.result.altKey, "AltKey is incorrect.");
            Assert.isFalse(this.result.shiftKey, "ShiftKey is incorrect.");
            Assert.isFalse(this.result.metaKey, "MetaKey is incorrect.");        
            Assert.areEqual(97, this.result.keyCode, "KeyCode is incorrect.");
        }
    
    });
    
    //-------------------------------------------------------------------------
    // TextEvent Test Case
    //-------------------------------------------------------------------------
    
    function TextEventTestCase(type /*:String*/){
        TextEventTestCase.superclass.constructor.call(this, type);
    }
    
    YAHOO.lang.extend(TextEventTestCase, KeyEventTestCase, {
    
        /*
         * Tests that the default properties are correct.
         */
        testCharCode : function () /*:Void*/{
        
            //fire the click event
            UserAction[this.eventType](this.element, { charCode: 97 });

            //test the data coming back
            Assert.isObject(this.result, "No event object created.");
            Assert.areSame(this.element, YUE.getTarget(this.result), "Target is not correct.");
            Assert.areEqual(this.eventType, this.result.type, "Event type is incorrect.");
            Assert.isTrue(this.result.bubbles, "bubbles is incorrect.");
            Assert.isTrue(this.result.cancelable, "Cancelable is incorrect.");
            Assert.isFalse(this.result.ctrlKey, "CtrlKey is incorrect.");
            Assert.isFalse(this.result.altKey, "AltKey is incorrect.");
            Assert.isFalse(this.result.shiftKey, "ShiftKey is incorrect.");
            Assert.isFalse(this.result.metaKey, "MetaKey is incorrect.");        
            Assert.areEqual(97, YUE.getCharCode(this.result), "CharCode is incorrect.");
        }
    
    });
    
    //-------------------------------------------------------------------------
    // Overall master suite
    //-------------------------------------------------------------------------
    
    var suite /*:YAHOO.tool.TestSuite*/ 
        = new YAHOO.tool.TestSuite("YuiTest Tests");
        
    //-------------------------------------------------------------------------
    // Assert Tests
    //-------------------------------------------------------------------------

    //the user action suite
    var assertSuite /*:YAHOO.tool.TestSuite*/ 
        = new YAHOO.tool.TestSuite("Assert Tests");
    suite.add(assertSuite);
    
    //-------------------------------------------------------------------------
    // Assert Tests
    //-------------------------------------------------------------------------
    
    assertSuite.add(new YAHOO.tool.TestCase({
    
        name: "Boolean Assert Tests",
        
        _should: {
            fail: {
                testIsTrueOnFalse: true,
                testIsTrueOnObject: true,
                testIsFalseOnTrue: true,
                testIsFalseOnObject: true,
                testIsBooleanOnObject: true
            }
        },
        
        testIsTrueOnTrue: function () {
            Assert.isTrue(true);
        },
        
        testIsTrueOnFalse: function () {
            Assert.isTrue(false);
        },
        
        testIsTrueOnObject: function () {
            Assert.isTrue({});
        },
            
        testIsFalseOnTrue: function () {
            Assert.isFalse(true);
        },
        
        testIsFalseOnFalse: function () {
            Assert.isFalse(false);
        },
        
        testIsFalseOnObject: function () {
            Assert.isFalse({});
        },
        
        testIsBooleanOnTrue: function () {
            Assert.isBoolean(true);
        },
        
        testIsBooleanOnFalse: function () {
            Assert.isBoolean(false);
        },
        
        testIsBooleanOnObject: function () {
            Assert.isBoolean({});
        }        
    
    }));


    assertSuite.add(new YAHOO.tool.TestCase({
    
        name: "Equivalence Assert Tests",
        
        _should: {
            fail: {
                testAreEqualOnTrueAndFalse: true,
                testAreEqualOn1And2: true,
                testAreEqualOnObjects: true
            }
        },
        
        testAreEqualOnTrue: function () {
            Assert.areEqual(true, true);
        },
        
        testAreEqualOn1: function () {
            Assert.areEqual(1, 1);
        },
        
        testAreEqualOn1And2: function () {
            Assert.areEqual(1, 2);
        },
        
        testAreEqualOn1AndString: function () {
            Assert.areEqual(1, "1");
        },
        
        testAreEqualOn1AndTrue: function () {
            Assert.areEqual(1, true);
        },

        testAreEqualOnTrueAndFalse: function () {
            Assert.areEqual(true, false);
        },

        testAreEqualOnObjects: function () {
            Assert.areEqual({}, {});
        }          
    }));
    
    assertSuite.add(new YAHOO.tool.TestCase({
    
        name: "Sameness Assert Tests",
        
        _should: {
            fail: {
                testAreSameOnTrueAndFalse: true,
                testAreSameOn1And2: true,
                testAreSameOn1AndString: true,
                testAreSameOn1AndTrue: true,
                testAreSameOnObjects: true
            }
        },
        
        testAreSameOnTrue: function () {
            Assert.areSame(true, true);
        },
        
        testAreSameOn1: function () {
            Assert.areSame(1, 1);
        },
        
        testAreSameOn1And2: function () {
            Assert.areSame(1, 2);
        },
        
        testAreSameOn1AndString: function () {
            Assert.areSame(1, "1");
        },
        
        testAreSameOn1AndTrue: function () {
            Assert.areSame(1, true);
        },

        testAreSameOnTrueAndFalse: function () {
            Assert.areSame(true, false);
        },

        testAreSameOnObjects: function () {
            Assert.areSame({}, {});
        },

        testAreSameOnSameObjects: function () {
            var o = {};
            Assert.areSame(o, o);
        }

        
    }));    
    
    //-------------------------------------------------------------------------
    // UserAction Tests
    //-------------------------------------------------------------------------

    //the user action suite
    var userActionSuite /*:YAHOO.tool.TestSuite*/ 
        = new YAHOO.tool.TestSuite("UserAction Tests");
    suite.add(userActionSuite);
    
    var mouseEventsSuite /*:YAHOO.tool.TestSuite*/ 
        = new YAHOO.tool.TestSuite("MouseEvent Tests");
    userActionSuite.add(mouseEventsSuite);
    
    var keyEventsSuite /*:YAHOO.tool.TestSuite*/ 
        = new YAHOO.tool.TestSuite("KeyEvent Tests");
    userActionSuite.add(keyEventsSuite);

    //-------------------------------------------------------------------------
    // Mouse Tests
    //-------------------------------------------------------------------------
    mouseEventsSuite.add(new MouseButtonEventTestCase("click"));
    mouseEventsSuite.add(new MouseButtonEventTestCase("dblclick"));
    mouseEventsSuite.add(new MouseButtonEventTestCase("mousedown"));
    mouseEventsSuite.add(new MouseButtonEventTestCase("mouseup"));        
    mouseEventsSuite.add(new MouseMovementEventTestCase("mouseover"));
    mouseEventsSuite.add(new MouseMovementEventTestCase("mouseout"));
    
    //-------------------------------------------------------------------------
    // Key Tests
    //-------------------------------------------------------------------------
    keyEventsSuite.add(new KeyDirectionEventTestCase("keyup"));
    keyEventsSuite.add(new KeyDirectionEventTestCase("keydown"));
    keyEventsSuite.add(new TextEventTestCase("keypress"));


    //return it
    return suite;

})();