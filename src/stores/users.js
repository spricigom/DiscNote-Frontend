import { defineStore } from "pinia";
import usersService from "@/services/users";
import { useAuthStore } from "./auth";
import { ref } from "vue";

const authStore = useAuthStore();

export const useUsersStore = defineStore("users", () => {
    const users = ref([]);

    async function fetchUsers() {
        users.value = await usersService.getAll();
    }

    async function createUser(name, email, password, passwordConfirm) {
        const username = name.toLowerCase().replace(/\s+/g, '');

        if (password !== passwordConfirm) {
            throw new Error("As senhas não coincidem");
        }

        const newUser = await usersService.create(name, email, username, password);
        users.value.push(newUser);

        await authStore.login(email, password);
    }

    return { users, fetchUsers, createUser };
});