/*global defineSuite*/
defineSuite([
        'Renderer/Renderbuffer',
        'Renderer/RenderbufferFormat',
        'Specs/createContext'
    ], 'Renderer/Renderbuffer', function(
        Renderbuffer,
        RenderbufferFormat,
        createContext) {
    "use strict";
    /*global jasmine,describe,xdescribe,it,xit,expect,beforeEach,afterEach,beforeAll,afterAll,spyOn*/

    var context;
    var renderbuffer;

    beforeAll(function() {
        context = createContext();
    });

    afterAll(function() {
        context.destroyForSpecs();
    });

    afterEach(function() {
        renderbuffer = renderbuffer && renderbuffer.destroy();
    });

    it('creates', function() {
        renderbuffer = new Renderbuffer({
            context : context,
            format : RenderbufferFormat.DEPTH_COMPONENT16,
            width : 64,
            height : 32
        });

        expect(renderbuffer.format).toEqual(RenderbufferFormat.DEPTH_COMPONENT16);
        expect(renderbuffer.width).toEqual(64);
        expect(renderbuffer.height).toEqual(32);
    });

    it('creates with defaults', function() {
        renderbuffer = new Renderbuffer({
            context : context
        });

        expect(renderbuffer.format).toEqual(RenderbufferFormat.RGBA4);
        expect(renderbuffer.width).toEqual(context.canvas.clientWidth);
        expect(renderbuffer.height).toEqual(context.canvas.clientHeight);
    });

    it('destroys', function() {
        var r = new Renderbuffer({
            context : context
        });
        expect(r.isDestroyed()).toEqual(false);
        r.destroy();
        expect(r.isDestroyed()).toEqual(true);
    });

    it('throws when created with invalid format', function() {
        expect(function() {
            renderbuffer = new Renderbuffer({
                context : context,
                format : 'invalid format'
            });
        }).toThrowDeveloperError();
    });

    it('throws when created with small width', function() {
        expect(function() {
            renderbuffer = new Renderbuffer({
                context : context,
                width : 0
            });
        }).toThrowDeveloperError();
    });

    it('throws when created with large width', function() {
        expect(function() {
            renderbuffer = new Renderbuffer({
                context : context,
                width : context.maximumRenderbufferSize + 1
            });
        }).toThrowDeveloperError();
    });

    it('throws when created with small height', function() {
        expect(function() {
            renderbuffer = new Renderbuffer({
                context : context,
                height : 0
            });
        }).toThrowDeveloperError();
    });

    it('throws when created with large height', function() {
        expect(function() {
            renderbuffer = new Renderbuffer({
                context : context,
                height : context.maximumRenderbufferSize + 1
            });
        }).toThrowDeveloperError();
    });

    it('throws when fails to destroy', function() {
        var r = new Renderbuffer({
            context : context
        });
        r.destroy();

        expect(function() {
            r.destroy();
        }).toThrowDeveloperError();
    });

    it('throws when there is no context', function() {
        expect(function() {
            new Renderbuffer();
        }).toThrowDeveloperError();
    });
}, 'WebGL');