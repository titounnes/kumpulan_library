$(document).on('click','#generate', function(){
	$('#fp').html(generateFingerprint())
})
var generateFingerprint = function() {
    var fingerprint = [];
    var pluginsItem = ['name', 'filename', 'description', 'version'];
    $.each(navigator.plugins, function(i, v) {
      $.each(pluginsItem, function(j, w) {
        fingerprint.push(v[w]);
      })
    })
    fingerprint.push(navigator.userAgent);
    var screenItem = ['availHeight', 'availWidth', 'colorDepth', 'height', 'pixelDepth', 'width'];
    $.each(screenItem, function(i, v) {
      fingerprint.push(screen[v])
    })
    try {
      if ($("#glcanvas").length == 0) {
        $(document.body).append("<canvas id='glcanvas'></canvas>");
      }
      var canvas = document.getElementById("glcanvas");
      gl = canvas.getContext("experimental-webgl");
      gl.viewportWidth = canvas.width;
      gl.viewportHeight = canvas.height;
      var glItem = ['VERSION', 'SHADING_LANGUAGE_VERSION', 'VENDOR', 'RENDERER'];
      $.each(glItem, function(i, v) {
        fingerprint.push(gl.getParameter(gl[v]))
      })
      fingerprint.push(gl.getSupportedExtensions().join());
    } catch (e) {
      fingerprint.push(e);
    }
  return md5(fingerprint.join())
}

