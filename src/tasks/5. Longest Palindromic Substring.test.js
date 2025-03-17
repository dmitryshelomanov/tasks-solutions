/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let left = 0;
  let right = 0;
  let max = [0, 0];

  if (s.length === 1) {
    return s;
  }

  while (right < s.length) {
    if (isPalindrome(s.slice(left, right))) {
      max = right - left > max[1] - max[0] ? [left, right] : max;
    } else {
      left++;
    }

    right++;
  }

  console.log(max);
  return s.slice(max[0], max[1]);
};

function isPalindrome(str) {
  let start = 0;
  let end = str.length - 1;

  while (start < end) {
    if (str[start] !== str[end]) {
      return false;
    }

    start += 1;
    end -= 1;
  }

  return true;
}

console.log(longestPalindrome("babad"));

// /*
// babad
// bab
// */

/*
Наше приложение-чат должно отображать новые сообщения, которые приходят с сервера, как можно быстрее.

Сообщение имеет формат:

interface Message {
    id: number
    text: string
}

Id самого первого сообщения = 1, а id каждого следующего сообщения на 1 больше, чем id предыдущего.
Нам нужно выводить сообщения в правильном порядке, однако сервер не гарантирует правильный порядок
сообщений, отправляемых в наше приложение.

Таймлайн:
// (приходит) 7 1 2 3 6 5 4       8
// (рисуем)   . 1 2 3 . . 4 5 6 7 8

Сообщения от сервера приходят в обработчик функции connect:

connect((msg) => {
    ...
});

Отображать сообщения нужно с помощью функции render:
render(msg)
*/

function solution(connect, render) {
  let index = 1;
  const map = new Map();

  connect((msg) => {
    map.set(msg.id, msg);

    while (map.has(index)) {
      render(map.get(index));
      map.delete(index);
      index++;
    }
  });
}
