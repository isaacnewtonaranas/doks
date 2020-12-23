<template>
    <span class="folder-tree">
      <q-tree
          icon="folder"
          :ticked.sync="tree.ticked"
          no-connectors
          :nodes="tree.labels"
          node-key="label"
          tick-strategy="leaf"
      >
        <template v-slot:default-header="prop">
          <div class="row items-center">
            <template v-if="prop.node.children">
              <q-icon :name="folderIcon[prop.expanded?1:0]" color="orange" size="28px" class="q-mr-sm" />
              <div class="folder-open-added-icon" v-if="prop.expanded"></div>
            </template>
            <div class="text-subtitle1">{{ prop.node.label }}</div>
          </div>
        </template>
      </q-tree>
    </span>
</template>

<script>
export default {
  props: {
    tree: {
      default: {
        ticked:[],
        labels:{
          label: '',
          disabled: false,
          icon:'',
          children: [
            {
              label: '',
              disabled: false
            }
          ]
        }
      }
    }
  },
  data(){
    return {
      folderIcon:['folder','folder_open'],
    }
  }
}
</script>