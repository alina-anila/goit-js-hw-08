import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const player = new Player(document.querySelector('#vimeo-player'));
const CURRENT_TIME = 'videoplayer-current-time';

player.on('timeupdate', throttle(timeupdate, 1000));

if (localStorage.getItem(CURRENT_TIME)) {
  player.setCurrentTime(Number.parseFloat(localStorage.getItem(CURRENT_TIME)));
}

function timeupdate(event) {
  localStorage.setItem(CURRENT_TIME, event.seconds === event.duration ? 0 : event.seconds);
}
