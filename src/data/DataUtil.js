function objectInspectHandler(path, obj, handler) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'undefined' === typeof obj) return;

    if ("string" === typeof obj) {
        handler(path, obj);
        return;
    }

    if ("number" === typeof obj) {
        handler(path, "number(" + obj + ")");
        return;
    }

    // Handle Date
    if (obj instanceof Date) {
        handler(path, "date(" + obj.getTime() + ")");
        return;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) objectInspectHandler((path + "." + attr), obj[attr], handler);
        }
    }

}
