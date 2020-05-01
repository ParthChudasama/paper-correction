<template>
  <b-jumbotron id="jumbo" v-if="!step2">
    <h1>Step 1</h1>
    <hr class="my-1" />
    <b-icon class="page-center" icon="cloud" style="width:120px; height:120px;"></b-icon>
    <p>
      <strong>
        Please upload all the students answer here!
      </strong>
    </p>
    <div>
      <file-pond
        name="file"
        ref="student_file"
        label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"
        allowDrop="true"
        allowMultiple="true"
        instantUpload="false"
        allowRevert="True"
      />
    </div>
    <b-row class="justify-content-md-center">
      <b-button @click="submitFiles" variant="outline-dark">Upload files</b-button>
    </b-row>
  </b-jumbotron>
</template>

<script>
export default {
  name: "mystep1"
};
</script>

<style scoped></style>
