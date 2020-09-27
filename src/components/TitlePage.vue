/* eslint-disable no-undef */
<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col style="max-width: 850px" class="mx-auto mt-4">
          <b-row>
            <b-col>
              <b-alert variant="primary" class="pt-3" show
                ><h5>
                  Click on the blue chat button to introduce yourself. Click on
                  a friend to start chatting.
                </h5></b-alert
              >
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h1 class="mb-5">
                Hi {{ nameString
                }}<b-link
                  ><b-icon
                    variant="primary"
                    @click="getUserName()"
                    class="ml-3"
                    font-scale="1.5"
                    icon="chat-dots"
                /></b-link>
              </h1>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h1 class="mb-5">Let's Chat...</h1>
            </b-col>
          </b-row>
          <b-row class="mb-5">
            <b-col>
              <b-link @click="showCharacterChat('Bart')">
                <b-img src="images/bart.png" fluid alt="Bart Reynolds"></b-img>
              </b-link>
            </b-col>
            <b-col>
              <b-link @click="showCharacterChat('McPufferson')">
                <b-img src="images/mcp.png" fluid alt="McPufferson"></b-img>
              </b-link>
            </b-col>
          </b-row>
          <b-row class="mb-5">
            <b-col>
              <b-link @click="showCharacterChat('MrCatman')">
                <b-img
                  src="images/mrcatman-sm.jpg"
                  fluid
                  alt="Bart Reynolds"
                ></b-img>
              </b-link>
            </b-col>
            <b-col>
              <b-link @click="showCharacterChat('Wuzzo')">
                <b-img src="images/wuzzo.png" fluid alt="McPufferson"></b-img>
              </b-link>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>

    <b-modal
      v-model="showModal"
      centered
      title="Let's Chat..."
      header-bg-variant="primary"
      header-text-variant="light"
      :cancel-disabled="true"
      :hide-header-close="true"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
    >
      <h4 class="text-center" v-html="highlightedSpeech"></h4>

      <div v-if="busyTalking" class="text-center">
        <b-spinner class="mt-3 p-3" variant="primary" label="Talking..." />
      </div>

      <div v-if="waitingOnAnswer" class="text-center">
        <b-spinner class="mt-3 p-3" variant="success" label="Listening..." />
      </div>

      <h4 class="text-center">{{ currentAnswer }}</h4>

      <b-alert variant="primary" class="mt-3 text-center" show>
        <h5>
          <div>
            If your device supports listening, try clicking "Listen", then say
            your name.
          </div>
          <div class="mt-3">You can also type your name below.</div>
        </h5>
      </b-alert>

      <b-form-group label="My Name Is: ">
        <b-input v-model="userName"> </b-input>
      </b-form-group>

      <template v-slot:modal-footer>
        <div>
          <b-button @click="repeat()" variant="primary"
            >Can you repeat that?</b-button
          >
          <b-button
            v-if="isListeningEnabled"
            :disabled="waitingOnAnswer"
            class="ml-2"
            @click="listen()"
            variant="success"
            >Listen</b-button
          >
          <b-button
            v-if="isListeningEnabled"
            :disabled="!waitingOnAnswer"
            class="ml-2"
            @click="stopListening()"
            variant="danger"
            >Stop Listening</b-button
          >
          <b-button class="ml-2" @click="bye()" variant="secondary"
            >Bye!</b-button
          >
        </div>
      </template>
    </b-modal>

    <b-modal
      v-model="showChatModal"
      centered
      title="What do you want to say?"
      header-bg-variant="primary"
      header-text-variant="light"
      :hide-header-close="true"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
    >
      <h4 v-if="characterSpeech" class="text-center mb-3">
        <span v-html="characterSpeechText"></span
        ><b-icon
          variant="primary"
          class="ml-3"
          font-scale="1.5"
          icon="chat-dots"
          :animation="characterTalking ? 'fade' : ''"
        />
      </h4>

      <div class="mx-auto text-center">
        <b-img :src="currentCharacterImage"></b-img>
      </div>

      <h4 v-if="userSpeech" class="text-center my-3">
        <span v-html="userSpeechText"></span
        ><b-icon
          variant="success"
          class="ml-3"
          font-scale="1.5"
          icon="chat-dots"
          flip-h
          :animation="userTalking ? 'fade' : ''"
        />
      </h4>

      <b-row class="mt-3">
        <b-col
          ><b-button
            block
            @click="onUserTalk(0)"
            variant="success"
            class="m-1 p-2"
            v-if="talkButtons[0].show"
            >{{ talkButtons[0].text }}</b-button
          ></b-col
        >
        <b-col
          ><b-button
            block
            @click="onUserTalk(1)"
            variant="success"
            class="m-1 p-2 mw-100"
            v-if="talkButtons[1].show"
            >{{ talkButtons[1].text }}</b-button
          ></b-col
        >
      </b-row>
      <b-row class="mt-3">
        <b-col
          ><b-button
            block
            @click="onUserTalk(2)"
            variant="success"
            class="m-1 p-2"
            v-if="talkButtons[2].show"
            >{{ talkButtons[2].text }}</b-button
          ></b-col
        >
        <b-col
          ><b-button
            block
            @click="onUserTalk(3)"
            variant="success"
            class="m-1 p-2"
            v-if="talkButtons[3].show"
            >{{ talkButtons[3].text }}</b-button
          ></b-col
        >
      </b-row>

      <template v-slot:modal-footer>
        <div>
          <b-button class="ml-2" @click="bye()" variant="secondary"
            >Bye!</b-button
          >
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
let synth = window.speechSynthesis;
// eslint-disable-next-line no-undef
let _speakFunctions = speakFunctions({});
_speakFunctions.fn.init();

export default {
  name: "TitlePage",
  props: {},
  mounted() {},
  computed: {
    nameString() {
      if (!this.userName || this.userName == "friend") {
        return "friend, what's your name?";
      } else {
        return this.userName + "!";
      }
    },
    highlightedSpeech() {
      return this.getSpeechText(
        this.busyTalking,
        this.currentSpeech,
        "#cce5ff"
      );
    },
    characterSpeechText() {
      return this.getSpeechText(
        this.characterTalking,
        this.characterSpeech,
        "#cce5ff"
      );
    },
    userSpeechText() {
      return this.getSpeechText(this.userTalking, this.userSpeech, "#d4edda");
    },
    isListeningEnabled() {
      if (window.webkitSpeechRecognition) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    getSpeechText(busy, speech, color) {
      if (!busy || !this.currentWord) {
        return speech;
      }

      let stringToReplace = speech.substr(0, this.currentStartIndex);

      return speech.replace(new RegExp(stringToReplace, "i"), (match) => {
        return '<span style="background: ' + color + ';">' + match + "</span>";
      });
    },
    getUserName() {
      this.bye();
      this.showModal = true;
      this.listenAfterSpeak = true;
      this.defaultSpeak("Hi friend, what's your name?");
    },
    defaultSpeak(text) {
      let u = _speakFunctions.fn.getUtterance(text, "Samantha", 0, 0);
      this.speakWithCallback(
        u,
        (evt) => {
          this.currentWord = "";
          this.currentSpeech = evt.currentTarget.text;
          this.busyTalking = true;
        },
        () => {
          // eslint-disable-next-line no-console
          //console.log(evt)
          this.busyTalking = false;
          this.userTalking = false;
          this.characterTalking = false;
          this.currentWord = "";

          if (this.listenAfterSpeak) {
            this.listenAfterSpeak = false;
            this.listen();
          }
        }
      );
    },
    userSpeak(u, endCallback, callbackObj) {
      this.speakWithCallback(
        u,
        // eslint-disable-next-line no-unused-vars
        (evt) => {
          this.currentWord = "";
          //this.userSpeech = evt.currentTarget.text;
          this.userTalking = true;
        },
        () => {
          // eslint-disable-next-line no-console
          //console.log(evt)
          this.userTalking = false;
          this.currentWord = "";

          if (endCallback) {
            endCallback(callbackObj);
          }
        }
      );
    },
    characterSpeak(u, endCallback, callbackObj) {
      this.speakWithCallback(
        u,
        // eslint-disable-next-line no-unused-vars
        (evt) => {
          this.currentWord = "";
          //this.characterSpeech = evt.currentTarget.text;
          this.characterTalking = true;
        },
        () => {
          // eslint-disable-next-line no-console
          //console.log(evt)
          this.characterTalking = false;
          this.currentWord = "";

          if (endCallback) {
            endCallback(callbackObj);
          }
        }
      );
    },
    speakWithCallback(utterance, startCallback, endCallback) {
      if (startCallback) {
        utterance.addEventListener("start", startCallback);
      }

      utterance.addEventListener("boundary", (evt) => {
        // eslint-disable-next-line no-console
        //console.log(evt)
        this.currentStartIndex = evt.charIndex + evt.charLength;
        this.currentWord = evt.currentTarget.text.substr(
          evt.charIndex,
          evt.charLength
        );
      });

      if (endCallback) {
        utterance.addEventListener("end", endCallback);
      }

      this.currentUtterance = utterance;
      synth.speak(this.currentUtterance);
    },
    repeat() {
      synth.speak(this.currentUtterance);
    },
    bye() {
      this.showModal = false;
      this.showChatModal = false;
      this.busyTalking = false;
      this.currentWord = "";
      this.currentStartIndex = -1;
      this.currentSpeech = "";
      this.userSpeech = "";
      this.userTalking = false;
      this.characterSpeech = "";
      this.characterTalking = false;
      this.currentUtterance = null;
      synth.cancel();

      if (this.currentListener) {
        this.currentListener.abort();
      }
      this.currentListener = null;
      this.currentAnswer = "";
    },
    stopListening() {
      if (this.currentListener) {
        this.currentListener.abort();
      }
    },
    listen() {
      synth.cancel();

      if (window.webkitSpeechRecognition) {
        var grammar =
          "#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;";
        var recognition = new window.webkitSpeechRecognition();
        var speechRecognitionList = new window.webkitSpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;
        recognition.continuous = false;
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.addEventListener("start", this.handleAnswerStart);
        recognition.addEventListener("result", this.handleAnswerResult);
        recognition.addEventListener("error", this.handleAnswerNoMatch);
        recognition.addEventListener("nomatch", this.handleAnswerNoMatch);
        recognition.addEventListener("end", this.handleAnswerEnd);
        this.currentListener = recognition;
        recognition.start();
      }
    },
    handleAnswerStart(evt) {
      // eslint-disable-next-line no-console
      console.log(evt);
      this.waitingOnAnswer = true;
    },
    handleAnswerResult(evt) {
      // eslint-disable-next-line no-console
      console.log(evt);
      var answer = event.results[0][0].transcript;
      // eslint-disable-next-line no-console
      console.log(answer);
      this.waitingOnAnswer = false;
      this.currentAnswer = "";

      if (this.currentSpeech.endsWith("what's your name?")) {
        this.userName = answer;
        this.listenAfterSpeak = true;
        this.defaultSpeak("Is your name " + this.userName + "?");
      } else if (this.currentSpeech.startsWith("Is your name")) {
        if (this.yesAnswers.includes(answer)) {
          this.defaultSpeak("Okay, I will call you " + this.userName + ".");
        } else {
          this.defaultSpeak("Let's try again, what's your name?");
        }
      }
    },
    handleAnswerNoMatch(evt) {
      // eslint-disable-next-line no-console
      console.log(evt);
      this.waitingOnAnswer = false;
      this.currentAnswer = "I didn't understand, click answer and try again.";
    },
    handleAnswerEnd(evt) {
      // eslint-disable-next-line no-console
      console.log(evt);
      this.waitingOnAnswer = false;
    },
    showCharacterChat(char) {
      this.bye();
      // eslint-disable-next-line no-undef
      let character = characters[char];
      this.currentCharacterImage = character.imageUrl;
      this.currentCharacter = character;
      this.setUserPhrases(this.currentCharacter.Conversations);
      this.showChatModal = true;
    },
    setUserPhrases(phrases) {
      this.currentButtonPhrases = phrases;

      for (let i = 0; i < this.maxTalkButtons; i++) {
        let buttonData = this.talkButtons[i];
        if (i < phrases.length) {
          buttonData.text = this.completePhrase(
            phrases[i].Phrase,
            phrases[i].Reader,
            false
          );
          buttonData.show = true;
        } else {
          buttonData.show = false;
        }
      }
    },
    completePhrase(phrase, alternateReader, isForSpeech) {
      var newPhrase = "";

      if (isForSpeech === true) {
        if (typeof alternateReader !== "undefined") {
          phrase = alternateReader;
        }
        newPhrase = phrase.replace(
          "%characterName%",
          this.currentCharacter.SpokenName
        );
      } else {
        newPhrase = phrase.replace(
          "%characterName%",
          this.currentCharacter.VisualName
        );
      }
      newPhrase = newPhrase.replace("%userName%", this.userName);

      return newPhrase;
    },
    onUserTalk(buttonIndex) {
      this.talkButtons[0].show = false;
      this.talkButtons[0].text = "";
      this.talkButtons[1].show = false;
      this.talkButtons[1].text = "";
      this.talkButtons[2].show = false;
      this.talkButtons[2].text = "";
      this.talkButtons[3].show = false;
      this.talkButtons[3].text = "";
      this.currentSpeech = "";

      this.userTalking = true;
      let currentPhrase = this.currentButtonPhrases[buttonIndex];
      let completePhrase = this.completePhrase(
        currentPhrase.Phrase,
        currentPhrase.Reader,
        true
      );
      this.userSpeech = completePhrase;
      let u = _speakFunctions.fn.getUtterance(completePhrase, "Samantha", 0, 0);

      this.characterSpeech = "";
      this.userSpeech = this.completePhrase(
        currentPhrase.Phrase,
        currentPhrase.Reader,
        false
      );
      let callbackObj = {
        currentPhrase: currentPhrase,
      };
      this.userSpeak(u, this.handleReply, callbackObj);
    },
    handleReply(obj) {
      let currentPhrase = obj.currentPhrase;

      // selectReply randomly
      var replyIndex = 0;
      if (currentPhrase.Responses.length > 1) {
        // eslint-disable-next-line no-undef
        replyIndex =
          this.randomIntFromInterval(1, currentPhrase.Responses.length) - 1;
      }

      var currentReply = currentPhrase.Responses[replyIndex];

      // speak reply, do this on complete
      var u = _speakFunctions.fn.getUtterance(
        this.completePhrase(currentReply.Response, currentReply.Reader, true),
        this.currentCharacter["Voice"].Name,
        this.currentCharacter["Voice"].Rate,
        this.currentCharacter["Voice"].Pitch
      );

      this.userSpeech = "";
      this.characterSpeech = this.completePhrase(
        currentReply.Response,
        currentReply.Reader,
        false
      );
      let callbackObj = {
        currentPhrase: currentPhrase,
        currentReply: currentReply,
      };
      this.characterSpeak(u, this.respondToUser, callbackObj);
    },
    respondToUser(obj) {
      let currentPhrase = obj.currentPhrase;
      let currentReply = obj.currentReply;
      // set next phrases
      // if phrases are empty, end conversation
      if (currentReply.Phrases.length < 1) {
        // end conversation
        if (
          typeof currentPhrase.IsBye !== "undefined" &&
          currentPhrase.IsBye === true
        ) {
          this.bye();
        } else {
          this.setUserPhrases(this.currentCharacter.Conversations);
        }
      } else {
        this.setUserPhrases(currentReply.Phrases);
      }
    },
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
  },
  data: function () {
    return {
      userName: "friend",
      showModal: false,
      busyTalking: false,
      currentSpeech: "",
      currentWord: "",
      currentStartIndex: -1,
      currentUtterance: null,
      currentAnswer: "",
      waitingOnAnswer: false,
      currentListener: null,
      yesAnswers: ["yes", "yep", "yeah", "okay", "ok"],
      listenAfterSpeak: false,
      characterSpeech: "",
      characterTalking: false,
      userSpeech: "",
      userTalking: false,
      showChatModal: false,
      currentCharacterImage: "",
      currentCharacter: {},
      currentButtonPhrases: [],
      maxTalkButtons: 4,
      talkButtons: [
        { show: false, text: "" },
        { show: false, text: "" },
        { show: false, text: "" },
        { show: false, text: "" },
      ],
      stopTalkingCallback: null,
    };
  },
};
</script>