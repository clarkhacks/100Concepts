<template>
    <div id="notesList">
        <div id="notesWrapper" class="flex flex-wrap items-center p-7 px-10 rounded-md"
            :class="noteList.indexOf(note) % 2 == 0 ? 'bg-coolGray-50' : ''" v-for="note in noteList" v-bind:key="note">
            <div class="w-full md:w-auto mr-auto mb-6 md:mb-0">
                <h3 class="text-lg md:text-xl font-semibold">{{ note.noteName }}</h3>
            </div>
            <div class="w-full md:w-auto lg:mr-10 mb-6 md:mb-0">
                <div class="flex flex-wrap">
                    <div class="inline-flex w-full lg:w-auto mb-2 lg:mb-0 lg:mr-10 items-center">
                        <span class="font-medium text-coolGray-500">{{ note.privacy }}</span>
                    </div>
                    <div class="inline-flex w-full lg:w-auto items-center">
                        <span class="font-medium text-coolGray-500">{{ note.date }}</span>
                    </div>
                </div>
            </div>
            <div class="w-full md:w-auto flex">
                <a class="inline-block py-3 px-7 w-1/2 md:w-auto text-lg leading-8 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
                    :href="'/edit/'+ note.url">Edit</a>
                <a class="ml-2 inline-block py-3 px-7 w-1/2 md:w-auto text-lg leading-8 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
                    :href="'/@' + note.owner + '/' + note.url">View</a>
                <button
                    class="ml-2 inline-block py-3 px-7 w-1/2 md:w-auto text-lg leading-8 text-red-50 font-medium text-center bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-md shadow-sm"
                    @click="$emit('delete', note.url)">Delete</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NoteList',
    props: {
        noteList: Array,
    },
}
</script>