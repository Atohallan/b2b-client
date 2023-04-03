<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue"
import { generateOpenAIResponse, moderate } from "@/api/open-ai"
import { generateAI21Response } from "@/api/ai21"
import autoAnimate from "@formkit/auto-animate";

const form = ref()
onMounted(() => {
  form.value.querySelectorAll(".formkit-outer").forEach(autoAnimate)
})

const bot1Response = ref("")
const bot2Response = ref("")
const userInput = ref("")
const previousUserInput = ref("")
const chatHistoryMessageIsVisible = ref(false)
const flagged = ref(false)
const bot1Company = ref("")
const bot2Company = ref("")
const disableDropdowns = ref(false)

const modelCompanyOptions = [
  { label: 'OpenAI', value: 'openai' },
  { label: 'AI21 Studio', value: 'ai21' }
]

type MessageObject = {
  role: string;
  content: string;
}
let chatHistory: MessageObject[] = []

enum InputOrigin {
  user,
  bot
}

const instructions = `
You are a friendly, helpful assistant.
A user has asked a question or asked for some sort of explanation.
You are also having a conversation with another chat bot, discussing what the user has requested.
You will expand upon things the other chat bot says to help the user with their question.
You can disagree, agree, and/or add alternatives if you wish.
If the last message was from the user, then answer it normally.
Otherwise, respond to the last message in the chat history from the other bot.
Say things like "I agree" or "I disagree" so it appears as if you are having a conversation.
Although, don't say "I agree" every time you respond. Try not to be repetitive with its usage.
Think of other ways to make it appear like you are having a conversation.
The pattern of responses will always be: User, Bot, Bot, User, Bot, Bot, etc.
That means if you are the second bot responding, don't ask the other bot a question;
the user will respond next, so any question should be directed to the user.
`;

function addToChatHistory(origin: InputOrigin, input: string) {
  if (origin === InputOrigin.user) {
    chatHistory.push({ role: "user", content: input })
    return
  }

  if (origin === InputOrigin.bot) {
    chatHistory.push({ role: "assistant", content: input })
  }
}

function clearChatHistory() {
  chatHistory = []
  chatHistoryMessageIsVisible.value = true
  previousUserInput.value = ""
  bot1Response.value = ""
  bot2Response.value = ""
}

type FormSubmissionFields = {
  userInput: string;
  bot1Company: string;
  bot2Company: string
}

async function generate(fields: FormSubmissionFields) {
  chatHistoryMessageIsVisible.value = false
  flagged.value = false
  userInput.value = fields.userInput
  bot1Company.value = fields.bot1Company
  bot2Company.value = fields.bot2Company
  flagged.value = await moderate(userInput.value)
  previousUserInput.value = ""
  bot1Response.value = ""
  bot2Response.value = ""
  previousUserInput.value = userInput.value
  if (flagged.value === true) {
    userInput.value = ""
    return
  }
  addToChatHistory(InputOrigin.user, userInput.value)
  userInput.value = ""
  let messages = [
    { role: 'system', content: instructions },
    ...chatHistory,
  ]
  if (bot1Company.value === "openai") {
    bot1Response.value = await generateOpenAIResponse(messages)
  }
  if (bot1Company.value === 'ai21') {
    bot1Response.value = await generateAI21Response(messages)
  }
  addToChatHistory(InputOrigin.bot, bot1Response.value)
  messages = [
    { role: 'system', content: instructions },
    ...chatHistory,
  ]
  if (bot2Company.value === "openai") {
    bot2Response.value = await generateOpenAIResponse(messages)
  }
  if (bot2Company.value === 'ai21') {
    bot2Response.value = await generateAI21Response(messages)
  }
  addToChatHistory(InputOrigin.bot, bot2Response.value)
}

const chatHasHistory = computed(() => {
  return chatHistory.length > 0
})

watch(chatHasHistory, (newVal) => {
  disableDropdowns.value = newVal
})
</script>

<template>
  <div v-auto-animate>

    <h2>Let's Discuss</h2>

    <div v-if="previousUserInput" class="saved-user-input-container">
      <span>You:</span>
      <p class="saved-user-input">
        {{ previousUserInput }}
      </p>
    </div>

    <div v-if="bot1Response" class="bot-response-container">
      <img alt="Bot 1" class="bot-image" src="@/assets/images/bot-1.svg" width="75" height="75" />
      <span class="bot-response-label">Bot 1:</span>
      <div class="bot-response">
        {{ bot1Response }}
      </div>
    </div>

    <div v-if="bot2Response" class="bot-response-container">
      <img alt="Bot 2" class="bot-image" src="@/assets/images/bot-2.svg" width="75" height="75" />
      <span class="bot-response-label">Bot 2:</span>
      <div class="bot-response">
        {{ bot2Response }}
      </div>
    </div>

    <hr v-if="bot1Response">

    <div class="form" ref="form">
      <FormKit type="form" @submit="generate" submit-label="Discuss">
        <FormKit
          type="dropdown"
          name="bot1Company"
          label="Bot 1"
          placeholder="Select company"
          :options="modelCompanyOptions"
          :disabled="disableDropdowns"
        />

        <FormKit
          type="dropdown"
          name="bot2Company"
          label="Bot 2"
          placeholder="Select company"
          :options="modelCompanyOptions"
          :disabled="disableDropdowns"
        />

        <FormKit
          type="text"
          name="userInput"
          label="Your input"
          placeholder="Hey bots, please help me understand..."
          v-model.trim="userInput"
          validation="required:trim"
          validation-visibility="submit"
        />
      </FormKit>
    </div>

    <div class="clear-container">
      <button v-if="chatHistory.length > 0" @click="clearChatHistory" type="button" class="clear-button">Clear Chat History</button>
      <p v-if="chatHistoryMessageIsVisible">
        Chat history has been cleared.
      </p>
    </div>

    <div v-if="flagged" class="flagged-container">
      <p>
        Your input violated OpenAI's <a href="https://openai.com/policies/usage-policies" target="_blank" rel="noopener">usage policies</a>.
      </p>
    </div>

  </div>
</template>

<style scoped lang="scss">
h2 {
  text-align: center;
}

.form,
.bot-response-container,
.saved-user-input-container,
.clear-container,
.flagged-container {
  margin: 0.5rem auto;
  width: 350px;
}

.bot-response-label {
  margin-bottom: 0.5rem;
  display: block;
}

.bot-response {
  border-radius: 5px;
  background-color: #b9b5b5;
  padding: 0.5rem;
  color: #000;
}

.saved-user-input {
  margin: 0.5rem;
}

hr {
  border: none;
  height: 2px;
  width: 350px;
  margin: 2rem auto;
  background-color: #000;
}

.clear-button {
  border: none;
  border-radius: 5px;
  background-color: transparent;
  color: #ff3131;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
}

.clear-container {
  text-align: center;
}

.bot-image {
  display: block;
  margin: 1rem auto auto;
}

.flagged-container {
  p,
  a {
    color: #ff3131;
  }

  a {
    font-weight: bold;

    &:hover {
      text-decoration: none;
    }
  }
}
</style>
