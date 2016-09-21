crate.factory('messenger', function(){
  return {
    show: function(message) {
      Materialize.toast(message, 3000, 'rounded');
    }
  };
});
