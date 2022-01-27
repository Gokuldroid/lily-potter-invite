const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

var messageIndex = 0;

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function getSide(message) {
  return message.sender == LILY_NAME ? "left" : "right";
}

function isPreviousSamePerson(index) {
  return index == 0
    ? false
    : (CONVERSATIONS[index - 1].sender == CONVERSATIONS[index].sender);
}

function messageReplyDelay(messageText) {
  const delay = (messageText || '').split(" ").length * 200;
  return delay > 1800 ? 1800 : delay;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function appendMessage(message, index) {
  //   Simple solution for small apps
  const { sender, text } = message;
  const side = getSide(message);
  const opaqueClass = isPreviousSamePerson(index) ? 'opaque' : '';
  const hiddenClass = isPreviousSamePerson(index) ? 'hidden' : '';
  const msgHTML = `
      <div class="msg ${side}-msg">
        <p class="msg-img ${opaqueClass}"">${sender.toLocaleUpperCase()[0]}</p>
        <div class='sp-${index}'>
          <span class='spinme-" + ${side} + "'>
              <div class='spinner'>
                  <div class='bounce1'></div>
                  <div class='bounce2'></div>
                  <div class='bounce3'></div>
              </div>
          </span>
        </div>
        <div class="msg-bubble msg-bubble-${index} hidden">
          <div class="msg-info-name ${hiddenClass}">${sender}</div>
          <div class="msg-text">${text}</div>
          <p class="msg-info-time ${opaqueClass}">${formatDate(new Date())}</p>
        </div>
      </div>
    `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 1000;
  var initialDelay = message.sender == POTTER_NAME ? 25 : 1500;
  $(`.sp-${index}`).delay(initialDelay).hide(1);
  setTimeout(function () {
    $(`.msg-bubble-${index}`).removeClass("hidden");
    playSound('http://localhost:5500/notification-sound.mp3');
    msgerChat.scrollTop += 1000;
  }, initialDelay + 200);
  return initialDelay + randomInteger(500, 1000);
}

function playSound(url) {
  const audio = new Audio(url);
  audio.play();
}

// utils end
const LILY_NAME = "Lily ❤️ 🌺";
const POTTER_NAME = "Potter  👨‍💻";

const CONVERSATIONS = [
  {
    text: "Ooi! partner 🥴",
    sender: POTTER_NAME,
  },
  {
    text: "Sollu da! 🙋‍♀️",
    sender: LILY_NAME,
  },
  {
    text: "Partnerrr !!! It's been eighhttttt years! 🤪 🤪 🤪",
    sender: POTTER_NAME,
  },
  {
    text: "Can't believe...it just ✈️  lik tht. right???",
    sender: LILY_NAME,
  },
  {
    text: "Can't wait for d day to pass 🙈 🙈 🙈",
    sender: POTTER_NAME,
  },
  {
    text: "Same here! 👻",
    sender: LILY_NAME,
  },
  {
    text: "Finally!!! 💍   ➡️  🤵 👰🏻",
    sender: LILY_NAME,
  },
  {
    text: "Hello! Mrs. Gokul 😜",
    sender: POTTER_NAME,
  },
  {
    text: "Hi! my dear purusa...🤭 🤭 🙈 🙈",
    sender: LILY_NAME,
  },
  {
    text: "idk my friends will wake up @ 5 am 😂",
    sender: POTTER_NAME,
  },
  {
    text: "if they didn't 💣 💣 💣 💣 💣",
    sender: LILY_NAME
  },
  {
    text: "Exactly 🔪 ⚔️ 🗡️",
    sender: POTTER_NAME,
  },
  {
    text: "Let's send a reminder once more to everyone.",
    sender: POTTER_NAME
  },
  {
    text: "🚨 Tmrw mrng: 5am - 6am @murugar temple",
    sender: LILY_NAME
  },
  {
    text: "⏭️ MC mahal from 7am",
    sender: LILY_NAME
  },
  {
    text: "and we will upload the video link asap! incase if you're planning to attend virtually 😷 😷 😷.",
    sender: LILY_NAME
  },
  {
    text: "Will be enough right?!",
    sender: LILY_NAME
  },
  {
    text: "looks good ✅",
    sender: POTTER_NAME
  },
];

function typeAndSend() {
  var i = 0;
  var element = $(".msger-input");
  var text = CONVERSATIONS[messageIndex].text;
  var typeWriterCallBack = function () {
    if (i < text.length) {
      element.val(element.val() + text.charAt(i));
      i++;
      console.log(text);
      setTimeout(typeWriterCallBack, randomInteger(20, 40));
    } else {
      setTimeout(()=> {
        element.val("");
        const delayToAdd = appendMessage(CONVERSATIONS[messageIndex], messageIndex);
        messageIndex = messageIndex + 1;
        setTimeout(addNextMessage, delayToAdd);   
      }, 150);
    }
  };
  typeWriterCallBack();
}

function addNextMessage() {
  setTimeout(() => {
    if (messageIndex < CONVERSATIONS.length) {
      if (CONVERSATIONS[messageIndex].sender == LILY_NAME) {
        const delayToAdd = appendMessage(CONVERSATIONS[messageIndex], messageIndex);
        messageIndex = messageIndex + 1;
        setTimeout(addNextMessage, delayToAdd);
      } else {
        typeAndSend();
      }
    }
  }, messageReplyDelay(CONVERSATIONS[messageIndex] && CONVERSATIONS[messageIndex].text));
}

function startConversations() {
  messageIndex = 0;
  addNextMessage();
}

setTimeout(startConversations, 5000);
