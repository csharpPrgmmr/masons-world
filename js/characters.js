var byeMasonPhrase =
{
  "Phrase": "Bye %characterName%",
  "IsBye": true,
  "Responses": [
    {
      "Response": "Bye Mason",
      "Phrases": []
    }
  ]
};

var goodNightMasonPhrase =
{
  "Phrase": "Ok, good night %characterName%",
  "IsBye": true,
  "Responses": [
    {
      "Response": "Good Night Mason",
      "Phrases": []
    }
  ]
};

var letsTalkMorePhrase =
{
  "Phrase": "Let's talk some more",
  "Responses": [
    {
      "Response": "Okay!",
      "Phrases": []
    }
  ]
};

var endingArray = [byeMasonPhrase, letsTalkMorePhrase];

var popSeeKoConversation = 
{
  "Phrase": "Hey, %characterName%",
  "Responses": [
    {
      "Response": "Hey What?",
      "Phrases": [
        {
          "Phrase": "Are you ready?",
          "Responses": [
            {
              "Response": "For What?",
              "Phrases": [
                {
                  "Phrase": "To Pop!",
                  "Responses": [
                    {
                      "Response": "Pop what?",
                      "Phrases": [
                        {
                          "Phrase": "Pop-See-Ko!",
                          "Reader": "Pop-sea-co!",
                          "Responses": [
                            {
                              "Response": "My hands are high, my feet are low, and this is how I Pop-See-Ko!",
                              "Reader": "My hands are high my feet are low and this is how I pop-sea-co!",
                              "Phrases": endingArray
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

var howAreYouConversation =
{
  "Phrase": "How are you today?",
  "Responses": [
    {
      "Response": "I'm doing great! How are you?",
      "Phrases": [
       {
        "Phrase": "I'm good, thanks for asking.",
        "Responses": [
         {
          "Response": "I'm glad to hear that.",
          "Phrases": endingArray
         }
        ]
       },
       {
        "Phrase": "I don't feel good.",
        "Responses": [
         {
          "Response": "I'm sorry, I hope you feel better.",
          "Phrases": endingArray
         }
        ]
       },
       {
        "Phrase": "I'm ok, I'm a little bored.",
        "Responses": [
         {
          "Response": "Maybe you should go outside and play!",
          "Phrases": endingArray
         }
        ]
       },
       {
        "Phrase": "I'm mad.",
        "Responses": [
         {
          "Response": "Take a deep breath, and try to calm down.",
          "Phrases": endingArray
         }
        ]
       }
      ]
    },
    {
      "Response": "I feel sad. I fell and got hurt.",
      "Phrases": [
       {
        "Phrase": "I'm sorry, I hope you feel better.",
        "Responses": [
         {
          "Response": "Thanks",
          "Phrases": endingArray
         }
        ]
       }
      ]
    },
    {
      "Response": "I'm excited, I'm going to Disney World.",
      "Phrases": [
       {
        "Phrase": "I love Disney World, I hope you have fun.",
        "Responses": [
         {
          "Response": "Thanks, I know I will.",
          "Phrases": endingArray
         }
        ]
       }
      ]
    },
    {
      "Response": "I'm tired, I'm going to sleep.",
      "Phrases": [goodNightMasonPhrase]
    }
  ]
};

var mustacheConversation = 
{
  "Phrase": "I like your mustache!",
  "Responses": [
    {
      "Response": "Thank you very much, do you have a mustache?",
      "Reader": "Thank you vary much, do you have a mowstash",
      "Phrases": [
       {
        "Phrase": "No, but my Poppy and Papaw do.",
        "Responses": [
         {
          "Response": "Awesome, they are cool.",
          "Phrases": endingArray
         }
        ]
       },
       {
        "Phrase": "Yes",
        "Responses": [
         {
          "Response": "Are you sure? I don't think so.",
          "Phrases": endingArray
         }
        ]
       },
       {
        "Phrase": "I have mustache hands.",
        "Responses": [
         {
          "Response": "Are you serious?  I have mustache hands after I workout.",
          "Reader": "Are you seri us? I have mowstash hands after I workout",
          "Phrases": endingArray
         }
        ]
       },
       {
        "Phrase": "No, I shaved it off.",
        "Responses": [
         {
          "Response": "You should grow it back, having a mustache id cool.",
          "Reader": "You shood growit back, having a mowstash is cool.",
          "Phrases": endingArray
         }
        ]
       }
      ]
    }
  ]
};

var buildWuzzoConversation = 
{
  "Phrase": "Can I build you?",
  "Responses": [
    {
      "Response": "That's a great idea.  I would love that.",
      "Phrases": [
       {
        "Phrase": "Ok, Let's go.",
        "Responses": [
         {
          "Response": "Awesome, Mix, Mix, Mix",
          "Phrases": endingArray
         }
        ]
       },
       {
        "Phrase": "Maybe later.",
        "Responses": [
         {
          "Response": "Ok, can you get me a ham loney sandwhich while I wait?",
          "Phrases": endingArray
         }
        ]
       }
      ]
    }
  ]
};

var birthdayConversation = 
{
  "Phrase": "It's my birthday!",
  "Responses": [
    {
      "Response": "Happy Birthday Mason, I hope you have a wonderful day!",
      "Phrases": [
       {
        "Phrase": "Thank you, %characterName%",
        "Responses": [
         {
          "Response": "Happy Birthday to you, Happy Birthday to you, Happy Birthday, Dear Mason, Happy Birthday, to you!",
          "Phrases": endingArray
         }
        ]
       }
      ]
    }
  ]
};


var characters ={
  "Bart": {
    "SpokenName": "Bart",
    "VisualName": "Bart",
    "Voice": {
      "Name": "Maged",
      "Rate": .9,
      "Pitch": -1
    },
    "Conversations": [
      popSeeKoConversation,
      howAreYouConversation,
      birthdayConversation,
      mustacheConversation
    ]
  },
  "McPufferson": {
    "SpokenName": "Mic-puffer-sun",
    "VisualName": "McPufferson",    
    "Voice": {
      "Name": "Samantha",
      "Rate": -1,
      "Pitch": 1.5
    },
    "Conversations": [
      popSeeKoConversation,
      birthdayConversation,
      howAreYouConversation
    ]
  },
  "MrCatman": {
    "SpokenName": "Mister Cat man",
    "VisualName": "Mr. Catman",
    "Voice": {
      "Name": "Daniel",
      "Rate": .9,
      "Pitch": -1
    },
    "Conversations": [
      popSeeKoConversation,
      birthdayConversation,
      howAreYouConversation
    ]
  },
  "Wuzzo": {
    "SpokenName": "Woozo",
    "VisualName": "Wuzzo",
    "Voice": {
      "Name": "Tessa",
      "Rate": .9,
      "Pitch": 0.5
    },
    "Conversations": [
      popSeeKoConversation,
      howAreYouConversation,
      birthdayConversation,
      buildWuzzoConversation
    ]
  }
};