(function() {
  (function() {
    var MDPIConfig, mdpiConfig;
    MDPIConfig = {};
    mdpiConfig = function(k, v) {
      if (v != null) {
        return MDPIConfig[k] = v;
      } else {
        return MDPIConfig[k];
      }
    };
    return window.mdpiConfig = mdpiConfig;
  })();

}).call(this);
