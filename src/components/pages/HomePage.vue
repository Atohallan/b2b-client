<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { generateResponse } from '@/api/request'
import autoAnimate from "@formkit/auto-animate";

const form = ref()
onMounted(() => {
  form.value.querySelectorAll(".formkit-outer").forEach(autoAnimate)
})

const botResponse = ref("")
const botResponse2 = ref("")
const userInput = ref("")
const previousUserInput = ref("")
let chatHistory = ""
const chatHistoryMessageIsVisible = ref(false)
let botResponseCount = 0
let userResponseCount = 0

enum InputOrigin {
  user,
  bot
}

function addToChatHistory(origin: InputOrigin, input: string, responseCount: number) {
  if (InputOrigin.user) {
    chatHistory += `User response #${responseCount}.User input: ${input}.`
  }

  if (InputOrigin.bot) {
    chatHistory += `Bot response #${responseCount}. Input from a bot: ${input}.`
  }
}

function clearChatHistory() {
  chatHistory = ""
  botResponseCount = 0
  chatHistoryMessageIsVisible.value = true
  previousUserInput.value = ""
  botResponse.value = ""
  botResponse2.value = ""
}

type FormSubmissionFields = {
  userInput: string;
}

async function generate(fields: FormSubmissionFields) {
  chatHistoryMessageIsVisible.value = false
  userInput.value = fields.userInput
  userResponseCount++
  addToChatHistory(InputOrigin.user, userInput.value, userResponseCount)
  previousUserInput.value = ""
  botResponse.value = ""
  botResponse2.value = ""
  previousUserInput.value = userInput.value
  userInput.value = ""
  botResponse.value = await generateResponse(chatHistory)
  botResponseCount++
  addToChatHistory(InputOrigin.bot, botResponse.value, botResponseCount)
  botResponse2.value = await generateResponse(chatHistory)
  botResponseCount++
}
</script>

<template>
  <div v-auto-animate>

    <h2>Let's Discuss</h2>

    <div v-if="previousUserInput.length > 0" class="saved-user-input-container">
      <span>You:</span>
      <p class="saved-user-input">
        {{ previousUserInput }}
      </p>
    </div>

    <div v-if="botResponse.length > 0" class="bot-response-container">
      <img alt="Bot 1" class="bot-image" src="@/assets/images/bot-1.svg" width="75" height="75" />
      <span class="bot-response-label">Bot 1:</span>
      <div class="bot-response">
        {{ botResponse }}
      </div>
    </div>

    <div v-if="botResponse2.length > 0" class="bot-response-container">
      <img alt="Bot 2" class="bot-image" src="@/assets/images/bot-2.svg" width="75" height="75" />
      <span class="bot-response-label">Bot 2:</span>
      <div class="bot-response">
        {{ botResponse2 }}
      </div>
    </div>

    <hr v-if="botResponse.length > 0">

    <div class="form" ref="form">
      <FormKit type="form" @submit="generate" submit-label="Discuss">
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

  </div>
</template>

<style scoped lang="scss">
h2 {
  text-align: center;
}

.form,
.bot-response-container,
.saved-user-input-container,
.clear-container {
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
</style>
