var audio;

function drawGame(){
  $('.justify-content-center').empty();
  $('.justify-content-center')
  .append($('<div class="col-md-auto" id="cat">'));
  categories.forEach((item)=>{
    $('#cat').append($('<p id='+item+'>').html(item));
  });
  prices.forEach((item)=>{
    var column = $('<div class="col-md-auto" id="'+item+'">');
    for(var i = 0; i < categories.length; i++){
        column.append($('<div class="row">').append($('<span class="badge badge-primary" id="'+item+'-'+i+'">').html(item)));
    }
    $('.justify-content-center').append(column);
  });
  $('.justify-content-center').append($('<button type="button" class="btn btn-primary btn-lg btn-block">').html('Stop Music'));
  $('.badge').click((e)=>{
    $(e.target).removeClass('badge-primary').addClass('badge-secondary');
    if(audio != undefined) audio.pause();
    audio = new Audio('src/audio/'+e.target.id+'.mp3');
    audio.play();
  });
  $('.btn').click(()=>{
    audio.pause();
  })
}
