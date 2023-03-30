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

enum InputOrigin {
  user,
  bot
}

function addToChatHistory(origin: InputOrigin, input: string, botResponseCount: number) {
  if (InputOrigin.user) {
    chatHistory = `Initial user input: ${input}.`
  }

  if (InputOrigin.bot) {
    chatHistory += `Response #${botResponseCount}. Input from other bot: ${input}.`
  }
}

type FormSubmissionFields = {
  userInput: string;
}

async function generate(fields: FormSubmissionFields) {
  userInput.value = fields.userInput
  addToChatHistory(InputOrigin.user, userInput.value, 0)
  previousUserInput.value = ""
  botResponse.value = ""
  botResponse2.value = ""
  previousUserInput.value = userInput.value
  userInput.value = ""
  botResponse.value = await generateResponse(chatHistory)
  addToChatHistory(InputOrigin.bot, botResponse.value, 1)
  botResponse2.value = await generateResponse(chatHistory)
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
      <span class="bot-response-label">Bot 1:</span>
      <div class="bot-response">
        {{ botResponse }}
      </div>
    </div>

    <div v-if="botResponse2.length > 0" class="bot-response-container">
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

  </div>
</template>

<style scoped lang="scss">
h2 {
  text-align: center;
}

.form,
.bot-response-container,
.saved-user-input-container {
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
</style>
