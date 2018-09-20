<template>
	<transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h1>Using Todastic</h1>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="help-entry">
                <h3>Labels</h3>
                <span>You can add and remove labels by editing the ToDo text.
                  Adding a label is as simple as adding <q>#label</q> somewhere in the text.
                  Labels within your text will be extracted in order to keep your ToDo text readable.
                  Labels at the end will be removed from the text and just live as labels.
                  <br /><br />
                  <u>Example:</u><br />
                  <q>Build a #zoo with lots of #animals in it #life-goals</q><br /> will result
                  in the ToDo text <q>Build a zoo with lots of animals in it</q> and the labels
                  <q>#zoo, #animals, #life-goals</q>.
                </span>
              </div>
              <div class="help-entry">
                <h3>Tracking time</h3>
                <span>You can add and remove time tracking entries by editing the ToDo text.
                  <br />Time tracking entries follow the pattern
                  <q>#TRACK({"trackedTime": "01:00:00", "tracker": "Mary", "date": "2018-09-13 17:27:00"}})</q>
                  <br />You can add as many of them as you like to your ToDo.
                  <br />Removing or editing an entry is done via editing the ToDo text.
                  <br />You can analyze the time entries via scripting.
                </span>
              </div>
              <div class="help-entry">
                <h3>Scripting</h3>
                <span>The ability to run arbitrary scripts is one of Todastics most powerful features.
                Scripts are plain <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript">JavaScript</a>.
                The following variables are defined:
                <ul>
                  <li><q>list</q></li> incorporating the complete ToDo tree
                  <li><q>dashboard</q></li> providing the two functions
                  <ul>
                    <li><q>groupByStatus(list)</q></li>
                    <li><q>trackedTime(list)</q></li>
                  </ul>
                </ul>
                <br />
                <u>Example:</u><br />
                <q>console.log(dashboard.groupByStatus(list))</q> will show the ToDos grouped by status in your
                Browser console. (We don't have a good way to display the results yet, sorry!)
                </span>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <a href="mailto:feedback@todastic.app">Feedback / Contact</a>
              <button class="modal-default-button" @click="$emit('close')">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Help"
}
</script>

<style>
.help-entry {
  padding-bottom: 20px;
  font-size: medium;
}
.help-entry q {
  background-color: rgba(0, 0, 0, 0.05);
  quotes: none;
  font-family:Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New;

}
.help-entry h3 {
  padding-bottom: 5px;
}
.help-entry ul {
  padding-left: 20px;
}
.help-entry ul ul {
  padding-left: 50px;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 90%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>