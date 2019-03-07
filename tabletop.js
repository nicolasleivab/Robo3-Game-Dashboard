function init() {
  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1-zYRyDdNQsO1PFA8TivQQvh_CkDZx3lrjUIzoyXsjp4/pubhtml',
                   callback: function(data, tabletop) { 
                       console.log(data)
                   },
                   simpleSheet: true } )
}
window.addEventListener('DOMContentLoaded', init)