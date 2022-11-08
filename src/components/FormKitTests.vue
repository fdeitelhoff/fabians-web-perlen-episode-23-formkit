<script setup lang="ts">
import { ref, inject } from 'vue';

const currentLocale = ref('de');
const submitted = ref(false);

const config = inject(Symbol.for('FormKitConfig'));

const changeLocale = () => {
  currentLocale.value = currentLocale.value === 'en' ? 'de' : 'en';
  config.locale = currentLocale.value;
};

function lastname(node) {
  console.log('lastname rule is active!');
  return node.value.toLowerCase() === 'deitelhoff';
}

const submitHandler = async () => {
  await new Promise((r) => setTimeout(r, 3000));
  submitted.value = true;
};
</script>

<template>
  <a @click.prevent="changeLocale" href="#">
    <span v-if="currentLocale === 'en'">🇩🇪 config.locale = 'de'</span>
    <span v-if="currentLocale === 'de'">🇺🇸 config.locale = 'en'</span>
  </a>

  <h3>First Example</h3>
  <FormKit type="text" />

  <h3>Second Example</h3>
  <div v-if="submitted">
    <h2>Daten erfolgreich übermittelt!</h2>
  </div>
  <FormKit
    type="form"
    id="second-form"
    submit-label="Abschicken"
    :form-class="submitted ? 'hide' : 'show'"
    @submit="submitHandler"
    :actions="false"
  >
    <FormKit type="text" />

    <FormKit type="submit" label="Abschicken" />
  </FormKit>

  <!-- :validation-rules="{ lastname }"
      validation-visibility="live"
      :validation-messages="{
        lastname: 'The correct answer is: Jordan.',
      }" -->
  <h3>Third Example</h3>
  <FormKit
    type="form"
    id="third-form"
    submit-label="Aktualisieren"
    @submit="submitHandler"
  >
    <FormKit
      type="text"
      prefix-icon="people"
      label="Nachname"
      name="lastname"
      placeholder="Ihr Nachname"
      help="Geben Sie bitte Ihren Nachnamen ein (nicht Geburtsname)."
      validation="required|length:2"
    />
    <FormKit
      type="email"
      prefix-icon="email"
      label="E-Mail-Adresse"
      name="email"
      placeholder="Ihre E-Mail-Adresse"
      help="Geben Sie bitte Ihre E-Mail-Adresse an, unter der wir Sie kontaktieren dürfen."
      validation="required|email"
    />
    <FormKit
      type="tel"
      prefix-icon="telephone"
      label="Telefon"
      name="phone"
      placeholder="Ihre Telefonnummer im Format xxx-xxx-xxxx"
      help="Optional können Sie Ihre Telefonnummer angeben, damit wir Sie telefonisch erreichen können."
      :validation="[['required'], ['matches', /^\d{3}-\d{3}-\d{4}$/]]"
      validation-visibility="live"
      :validation-messages="{
        matches: 'Das Format für eine Telefonnummer lautet: xxx-xxx-xxxx',
      }"
    />
  </FormKit>
</template>

<style>
h3 {
  margin-top: 50px;
  text-align: center;
}

.formkit-form {
  width: 420px;
  padding: 1.5em;
  border: 1px solid #e4e4e4;
  border-radius: 1em;
  margin: 0 auto 1em auto;
}

.hide {
  display: none;
}

/* Das funktioniert noch nicht! */
.formkit-input:focus {
  border-color: black;
}

[data-invalid] .formkit-inner {
  border-color: red;
  box-shadow: 0 0 0 1px red;
}

[data-invalid] .formkit-icon {
  color: red;
}

[data-complete] .formkit-inner {
  border-color: green;
  box-shadow: 0 0 0 1px green;
}

[data-complete] .formkit-icon {
  color: green;
}

[data-complete] .formkit-inner::after {
  content: '✔️';
  display: block;
  padding: 0.5em;
}
</style>
