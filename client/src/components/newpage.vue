<template>
  <div id="test">
    <b-navbar class="nav" toggleable="sm" type="dark">
      <b-navbar variant="faded" type="light">
        <b-navbar-brand tag="h1" class="mb-0">Automated paper correction</b-navbar-brand>
      </b-navbar>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="nav-items" id="a" href="#">Docs</b-nav-item>
        <b-nav-item class="nav-items" id="a" href="#">About</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div class="mycontainer">
      <b-overlay :show="busy" :opacity="0.88" rounded="sm">
        <b-jumbotron id="jumbo" v-if="!step2 && !step3 && !step4">
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

        <!--      step 2-->
        <transition name="slide">
          <b-jumbotron id="jumbo" v-if="step2 && !step3 && !step4">
            <h1>Step 2</h1>
            <hr class="my-1" />
            <b-icon class="page-center" icon="cloud" style="width:120px; height:120px;"></b-icon>
            <p>
              <strong>
                Please upload master copy!
              </strong>
            </p>
            <div>
              <file-pond
                name="master_file"
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
        </transition>

        <!--        step 3-->
        <transition name="slide">
          <b-jumbotron id="jumbo" v-if="step3 && !step4">
            <h1>Step 3</h1>
            <hr class="my-1" />
            <b-icon class="page-center" icon="cloud" style="width:120px; height:120px;"></b-icon>
            <p>
              <strong>
                Please upload reference material here!
              </strong>
            </p>
            <div>
              <file-pond
                name="correct_file"
                ref="correct_file"
                label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"
                allowDrop="true"
                allowMultiple="true"
                instantUpload="false"
                allowRevert="True"
              />
            </div>
            <b-row class="justify-content-md-center">
              <b-button @click="submitFilescorrect" variant="outline-dark">Upload files</b-button>
            </b-row>
          </b-jumbotron>
        </transition>

        <!--        step 4-->
        <transition name="slide">
          <b-jumbotron id="jumbo" v-if="step4">
            <h1>Download files</h1>
            <hr class="my-1" />
            <b-icon
              class="page-center mt-4"
              icon="cloud-download"
              style="width:120px; height:120px;"
            ></b-icon>
            <p class="mt-3">
              <strong>
                Click below to get results
              </strong>
            </p>

            <b-row class="justify-content-md-center ">
              <b-button class="mt-3" @click="downloadItem" variant="dark"
                >Download results</b-button
              >
            </b-row>
          </b-jumbotron>
        </transition>
      </b-overlay>
    </div>

    <b-navbar class="nav" toggleable="sm" type="dark" fixed="bottom">
      <b-navbar-nav>
        <b-nav-text><strong>@Copyright Parth Chudasama</strong> </b-nav-text>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
  /* eslint-disable */
import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import "../views/animate.css";

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import axios from "axios";
import carousel from "vue-owl-carousel";
// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType);
export default {
  sockets: {
    connect: function() {
      console.log("connected");
    },
    text_response: function(msg) {
      this.busy = JSON.parse(msg.data);
      console.log("socketemit", this.busy);
    }
  },
  data() {
    return {
      stud_files: "",
      step2: false,
      step3: false,
      step4: false,
      show: false,
      busy: false,
      timeout: null
    };
  },
  methods: {
    clearTimeout() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    },
    setTimeout(callback) {
      this.clearTimeout();
      this.timeout = setTimeout(() => {
        this.clearTimeout();
        callback();
      }, 1000);
    },
    submitFiles() {
      const formData = new FormData();
      this.$refs.student_file
        .getFiles()
        .map(fileItem => fileItem.file)
        .forEach(file => {
          // eslint-disable-next-line no-console

          formData.append("file", file);
        });
      axios
        .post("http://127.0.0.1:5000/student-upload", formData)
        .then(response => {
          this.busy = true;
          // Simulate an async request
          this.setTimeout(() => {
            this.busy = false;
          });
          this.step2 = true;
          console.log("Files have been uploaded");
          this.$refs.student_file.removeFiles();
        })
        .catch(err => {
          console.error("Axios post error");
          error("oh no");
        });
    },
    submitFilesmaster() {
      this.busy = true;
      // Simulate an async request
      this.setTimeout(() => {
        this.busy = false;
      });

      const formData = new FormData();
      this.$refs.master_file
        .getFiles()
        .map(fileItem => fileItem.file)
        .forEach(file => {
          // eslint-disable-next-line no-console

          formData.append("master", file);
        });
      axios
        .post("http://127.0.0.1:5000/master-upload", formData)
        .then(response => {
          this.step3 = true;
          this.step2 = false;
          console.log("Files have been uploaded");
        })
        .catch(err => {
          console.error("Axios post error");
        });
    },
    submitFilescorrect() {
      this.busy = true;
      const formData = new FormData();
      this.$refs.correct_file
        .getFiles()
        .map(fileItem => fileItem.file)
        .forEach(file => {
          // eslint-disable-next-line no-console

          formData.append("correction", file);
        });

      axios
        .post("http://127.0.0.1:5000/correct-upload", formData)
        .then(response => {
          this.step4 = true;
          this.step3 = false;
          this.step2 = true;

          console.log("Files have been uploaded");
        })
        .catch(err => {
          console.error("Axios post error");
        });
    },
    downloadItem() {
      axios
        .get("http://127.0.0.1:5000/download", { responseType: "blob" })
        .then(response => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute("download", "Student_result.zip");
          document.body.appendChild(fileLink);

          fileLink.click();
        })
        .catch(console.error);
      console.log(this.spin);
    }
  },
  components: {
    FilePond
  }
};
</script>

<style>
.nav-items {
  font-size: 16px;
  transition: all 0.3s ease 0s;
}
#a:hover {
  color: #0088a9;
}

.nav {
  font-family: "Source Code Pro", monospace;
  background-color: #24252a;
  margin-bottom: 3px;
}
.mycontainer {
  padding: 1rem;
}
#jumbo {
  padding: 2rem 2rem 4rem;
  min-height: 33.8rem;
}
.page-center {
  margin: 0 auto;
  padding: 0 10px;
  overflow: hidden;
}
.filepond--panel-root {
  background-color: #eaecef;
  border: 2px solid #2c3340;
}
.filepond--root {
  max-height: 10em;
}
#arrow {
  margin: 0px;
  padding: 6px 6px;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  font-size: 16px;
  transition: all 0.3s ease 0s;
  padding: 0.5rem 1rem;
  width: 100%;
  background-color: #24252a;
  color: white;
  text-align: center;
}
</style>
