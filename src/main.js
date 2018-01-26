var audio;

function drawGame(){
  $('.justify-content-center').empty();
  $('.justify-content-center')
  .append($('<div class="col-md-auto" id="cat">'));
  var column = {};
  Object.keys(data).forEach(function(obj){
    $('#cat').append($('<p id='+obj+'>').html(obj));
    Object.keys(data[obj]).forEach(function(category){
      if(column[category] == undefined){
        column[category] = $('<div class="col-md-auto" id="'+category+'">');
      }
      column[category].append($('<div class="row">').append($('<span class="badge badge-primary" id="'+obj+'-'+category+'"> data-toggle="modal" data-target="#exampleModal').html(category)));
      var element = data[obj][category];
      console.log(element);
    });
    console.log(obj);
  });
  Object.keys(column).forEach((key)=>{
      $('.justify-content-center').append(column[key]);
  })
  $('.badge').click((e)=>{
    $(e.target).removeClass('badge-primary').addClass('badge-pink');
    $(e.target).off('click');
    showModal(e.target);
  });
}
function showModal(cell)
{
  var cat = cell.id.split('-');
  var seconds = 0;
  var Timer;
  var body = $('<div class="modal-body">').append($('<ul class="list-group">'));
  var element = data[cat[0]][cat[1]];
  Object.keys(element.hint).forEach((key,i)=>{
    body.append($('<li class="list-group-item" id="'+key+'">').append($('<button type="button" class="btn btn-success" id="'+key+'">').html('ПОДСКАЗКА '+(i+1))));
  });

  console.log(data[cat[0]][cat[1]]);
  $('body').append($('<div class="modal" id="Modal" tabindex="1" role="dialog">')
    .append($('<div class="modal-dialog" role="document">')
      .append($('<div class="modal-content">')
        .append($('<div class="modal-header">')
          .append($('<h1 class="modal-title" id="exampleModalLabel">').html(cat[0]+" за "+cat[1])))
        .append(body)
        .append($('<div class="modal-footer" >')
          .append($('<span id="timer" style="padding: 75px;cursor:default;font-size:200px;" class="badge badge-success" title="media-play" aria-hidden="true">').html(pad(seconds,2)))
          .append($('<div class="control">')
            .append($('<svg xmlns="http://www.w3.org/2000/svg" class="icon i-play" viewBox="0 0 8 8"> <path d="M0 0v6l6-3-6-3z" transform="translate(1 1)" /> </svg>'))
            .append($('<svg xmlns="http://www.w3.org/2000/svg" style="width:100px;height:100px;margin:15px;"class="icon i-reload" viewBox="0 0 8 8"> <path d="M4 0c-2.2 0-4 1.8-4 4s1.8 4 4 4c1.1 0 2.12-.43 2.84-1.16l-.72-.72c-.54.54-1.29.88-2.13.88-1.66 0-3-1.34-3-3s1.34-3 3-3c.83 0 1.55.36 2.09.91l-1.09 1.09h3v-3l-1.19 1.19c-.72-.72-1.71-1.19-2.81-1.19z" /></svg>'))
            .append($('<svg xmlns="http://www.w3.org/2000/svg" class="icon i-stop" viewBox="0 0 8 8"><path d="M0 0v6h6v-6h-6z" transform="translate(1 1)" /></use> </svg>')))))));
  $('button').click((e)=>{
    e.target.remove();
    $('#'+e.target.id).append(e.target.id+": "+element.hint[e.target.id]);
  })
  $('.i-play').click((e)=>{
    console.log($(e.target));
    var path = e.target.children[0];
    $(e.target).toggleClass('media-play').toggleClass('media-pause');
    if(audio == undefined) audio = new Audio('src/audio/'+element['track']);

    if($(e.target).is('.media-pause')){
       audio.play();
       path.attributes.d.value = "M0 0v6h2v-6h-2zm4 0v6h2v-6h-2z";
       Timer = setInterval(()=>{
           seconds++;
           $('#timer').html(pad(seconds,2));
         }, 1000);
       }
    else{
      path.attributes.d.value = "M0 0v6l6-3-6-3z";
      clearInterval(Timer);
      audio.pause();
    }

  });
  $('.i-reload').click(()=>{
    if(audio != undefined){
       audio.currentTime = 0;
     }
     seconds = 0;
     $('#timer').html(pad(seconds,2));
  })
  $('.i-stop').click(()=>{
    if(audio != undefined){
      audio.pause();
      audio = undefined;
    }
    clearInterval(Timer);
    Timer=undefined;
    ShowAnswer(cell);
  })
}

function ShowAnswer(cell){
  var cat = cell.id.split('-');
  var body = $('<ul class="list-group" style="font-size:50px;">');
  var element = data[cat[0]][cat[1]]['win'];
  console.log('swfsf');
  body.append($('<li class="list-group-item">').html("Артист:<p>"+element.artist+"</p>"));
  body.append($('<li class="list-group-item">').html("Трэк:<p>"+element.track_name+"</p>"));
  body.append($('<li class="list-group-item" style="text-align:center;">').html("<img style='height:500px;box-shadow: 5px 5px 15px black;' src='src/covers/"+element.album_cover+"'></img>"));
  $('.modal-footer').remove();
  $('.modal-body').html(body);
  $('.modal').click((e)=>{
    if($(e.target).is('.modal')) $(e.target).remove();
    $('.badge-pink').removeClass('badge-pink').addClass('badge-secondary');
  });
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
