<template>
    <div class="row q-gutter-md">
        <q-input :dense="dense" :outlined="outlined" v-model="date.model.from" placeholder="yyyy/mm/dd" mask="date">
            <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="date.model.from">
                    <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                </q-date>
                </q-popup-proxy>
            </q-icon>
            </template>
        </q-input>
        <span class="q-mt-lg">-</span>
        <q-input :dense="dense" :outlined="outlined" v-model="date.model.to" placeholder="yyyy/mm/dd" mask="date">
            <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="date.model.to">
                    <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                </q-date>
                </q-popup-proxy>
            </q-icon>
            </template>
        </q-input>
    </div>
</template>

<script>
export default {
    props:{
        outlined: {
            default:null
        },
        dense: {
            default:null
        }
    },
    data(){
        return{
            date:{
                model:{
                    from:"",
                    to:""
                }
            },
        }
    }
}
</script>