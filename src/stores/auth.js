import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import md5 from 'crypto-js/md5';
import authService from '@/services/auth';

function useGravatar(email, size = 200) {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}

export const useAuthStore = defineStore('auth', () => {
    const isLogged = useStorage('isLogged', false);
    const user = useStorage('user', null, localStorage, {
        serializer: {
            read: (v) => (v ? JSON.parse(v) : null),
            write: (v) => JSON.stringify(v),
        },
    });
    const token = useStorage('token', null);
    const refresh = useStorage('refresh', null);

    async function login(email, password) {
        const { access, refresh: refreshToken } = await authService.login(email, password);

        isLogged.value = true;
        token.value = access;
        refresh.value = refreshToken;

        user.value = await authService.getUser();
        if (user.value?.email) {
            user.value.avatar = useGravatar(user.value.email);
        }
    }

    async function loginWithGoogle(googleToken) {
        try {
            const { access, refresh: refreshToken, user: userData } = await authService.loginGoogle(googleToken);

            isLogged.value = true;
            token.value = access;
            refresh.value = refreshToken;

            user.value = userData;
            if (user.value?.email) {
                user.value.avatar = useGravatar(user.value.email);
            }
        } catch (err) {
            console.error('Erro login com Google:', err);
        }
    }

    async function logout() {
        isLogged.value = false;
        user.value = null;
        token.value = null;
        refresh.value = null;
    }

    async function refreshToken() {
        if (!refresh.value) return;

        try {
            const { access } = await authService.refresh(refresh.value);
            token.value = access;
        } catch (err) {
            console.error('Erro ao renovar token:', err);
            logout();
        }
    }

    return {
        isLogged,
        user,
        token,
        refresh,
        login,
        logout,
        refreshToken,
        loginWithGoogle
    };
});