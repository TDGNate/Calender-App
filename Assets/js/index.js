
let dayEl = $('#currentDay')
let container = $('.container')
let clear = $('#clearBtn')

let today = moment().format("dddd,[ ]MMMM Do");
$(dayEl).text(today)

let hours = {
  "9:00 AM": "",
  "10:00 AM": "",
  "11:00 AM": "",
  "12:00 PM": "",
  "1:00 PM": "",
  "2:00 PM": "",
  "3:00 PM": "",
  "4:00 PM": "",
  "5:00 PM": "",
  "6:00 PM": ""
}

// check if there is something in the localstorage 
function retrieveHoursObj() {
  if (localStorage.length == 0) {
    return
  } else {
    let pullHours = JSON.parse(localStorage.getItem('hours'))
    hours = pullHours
  }
}
retrieveHoursObj()

// localStorage.clear()

function displayHours() {
  for (let hour in hours) {
    // Creating DOM Elements 
    let li = $('<li></li>').addClass('block');
    let span = $('<span></span>').attr('class', 'blockTime');
    span.text(hour);
    let textArea = $('<textarea></textarea>');
    textArea.attr('class', 'blockText');
    textArea.text(hours[hour])
    let button = $('<button></button>');
    button.attr('class', 'blockSave');

    let icon = $('<i class="fa fa-lock" aria-hidden="true"></i>');

    // Append DOM Elements 
    button.append(icon)
    li.append(span)
    li.append(textArea)
    li.append(button)
    container.append(li)
  }
  // Takes the array of blocks made and adds event listeners to get value
  ($('.blockSave').get().forEach(element => {
    $(element).on('click', () => {
      let parent = $(element).parent().get()
      let time = $(parent).children('.blockTime').text()
      let msg = $(parent).children('.blockText').val()
      // let areaBlock = $(element).parent().children('.blockText');
      // areaBlock.attr('class', 'saved');
      // areaBlock.delay('1000').removeClass('saved')
      saveBlocks(time, msg);
    })

    // check for enter button
    // console.log($(element).parent().children('.blockText'))
    
    $(element).parent().children('.blockText').keypress((event) => {
      if (event.which === 13) {
        event.preventDefault()
        let parent = $(element).parent().get()
        let time = $(parent).children('.blockTime').text()
        let msg = $(parent).children('.blockText').val()
      
        saveBlocks(time, msg);
      }
    })

  }))

  let momentHour = moment().format('H');
  colorCoordinate(momentHour)
}

displayHours()

function colorCoordinate(momentHour) {
  let blocks = $('.block')
  let blocksNum = $('.block').length;
  let num = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
  // console.log(blocks.length)
  for (i = 0; i < blocksNum; i++) {
    $(blocks[i]).attr('data-time', num[i])
  }
  // checks time to add color code background 
  for (i = 0; i < blocksNum; i++) {
    let blockData = $(blocks[i]).data().time;
    if (blockData == momentHour) {
      // console.log('present time')
      $(blocks[i]).css("background-color", "var(--present-clr)")
    } else if (blockData > momentHour) {
      // console.log('waiting for the future')
      $(blocks[i]).css("background-color", "var(--future-clr)")
    } else {
      // console.log('this the past')
      $(blocks[i]).css("background-color", "var(--grey-clr)")
    }
  }
}

// Function to save the time and the message in localstorage 

function saveBlocks(time, msg) {
  for (let hour in hours) {
    if (hour === time) {
      hours[time] = msg
    }
  }
  localStorage.setItem('hours', JSON.stringify(hours))
}

clear.on('click', () => {
  localStorage.clear()
  setTimeout(() => {
    location.reload()
  }, 300)
})

