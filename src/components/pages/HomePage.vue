<script setup lang="ts">
import { ref } from 'vue'
import { generateResponse } from '@/api/request'

const botResponse = ref("")
const userInput = ref("")

async function generate() {
  botResponse.value = ""
  botResponse.value = await generateResponse(userInput.value)
  userInput.value = ""
}
</script>

<template>
  <div>

    <h2>Let's Discuss</h2>

    <div class="form">
      <FormKit type="form" @submit="generate" submit-label="Discuss">
        <FormKit
          type="text"
          name="userInput"
          label="Your input"
          help="What interests you?"
          placeholder="Hey bots, what do you think about..."
          v-model="userInput"
        />
      </FormKit>
    </div>

    <div class="response">
      {{ botResponse }}
    </div>

  </div>
</template>

<style scoped lang="scss">
h2 {
  text-align: center;
}

.form,
.response{
  margin: 0 auto;
  width: 350px;
}

</style>
