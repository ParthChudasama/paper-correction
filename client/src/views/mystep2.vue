<template>
  <b-jumbotron id="jumbo2">
    <h1>Step 2</h1>
    <hr class="my-1" />
    <b-icon class="page-center" icon="cloud" style="width:120px; height:120px;"></b-icon>
    <p>
      <strong>Please upload master copy</strong>
    </p>
    <div>
      <file-pond
        name="masterfile"
        ref="master_file"
        label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"
        allowDrop="true"
        allowMultiple="true"
        instantUpload="false"
        allowRevert="True"
      />
    </div>
    <b-row class="justify-content-md-center">
      <b-button @click="submitFilesmaster" variant="outline-dark">Upload files</b-button>
    </b-row>
  </b-jumbotron>
</template>
<script>
export default {
  name: "step2"
};
</script>
