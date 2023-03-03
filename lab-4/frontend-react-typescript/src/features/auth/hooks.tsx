export const useAuth = () => {
  /* //https://github.com/ani-team/github-client/blob/dev/src/shared/hooks/use-local-storage.ts
    const [viewer, setViewer] = useLocalStorage<UserCredential | null>(CREDENTIAL_KEY, null);
    const isAuth = !!viewer;

    // FIXME: specify redirect urls?
    // FIXME: prohibit access?
    const login = (credential: UserCredential) => {
        setViewer(credential);
        window.location.href = `/${credential.username}`;
    };
    // FIXME: prohibit access?
    const logout = () => {
        setViewer(null);
    };

    return { isAuth, viewer, login, logout };
    */
};
