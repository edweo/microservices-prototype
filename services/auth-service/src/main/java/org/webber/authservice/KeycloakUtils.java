package org.webber.authservice;

import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.AccessTokenResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public final class KeycloakUtils {
    // Keycloak endpoint settings
    @Value("${services.keycloak-service}")
    private String KEYCLOAK_URL;
    @Value("${values.keycloak-realm}")
    private String REALM;

    // Users client (login to get JWT token, etc.)
    @Value("${values.client-id}")
    private String CLIENT_ID;
    @Value("${values.client-id-secret}")
    private String CLIENT_ID_SECRET;

    // Admin client for managing realm (registering, deleting users, etc.)
    @Value("${values.client-id-admin}")
    private String CLIENT_ID_ADMIN;
    @Value("${values.client-id-admin-secret}")
    private String CLIENT_ID_ADMIN_SECRET;

    private KeycloakUtils() {}

    public Keycloak getWebberAdminClient() {
        return KeycloakBuilder.builder()
                .serverUrl(KEYCLOAK_URL)
                .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
                .realm(REALM)
                .clientId(CLIENT_ID_ADMIN)
                .clientSecret(CLIENT_ID_ADMIN_SECRET)
                .build();
    }

    public Keycloak getWebberClient(String username, String password) {
        return KeycloakBuilder.builder()
                .serverUrl(KEYCLOAK_URL)
                .grantType(OAuth2Constants.PASSWORD)
                .realm(REALM)
                .clientId(CLIENT_ID)
                .clientSecret(CLIENT_ID_SECRET)
                .username(username)
                .password(password)
                .build();
    }

    public String convertTokenToString(AccessTokenResponse token) {
        var sb = new StringBuilder();
        sb.append(token.getToken()).append(":");
        sb.append(token.getExpiresIn()).append(":");
        sb.append(token.getRefreshExpiresIn()).append(":");
        sb.append(token.getRefreshToken()).append(":");
        sb.append(token.getTokenType()).append(":");
        sb.append(token.getIdToken()).append(":");
        sb.append(token.getNotBeforePolicy()).append(":");
        sb.append(token.getSessionState()).append(":");
        sb.append(token.getScope()).append(":");
        sb.append(token.getError()).append(":");
        sb.append(token.getErrorDescription()).append(":");
        sb.append(token.getErrorUri()).append(":");
        sb.append(token.getOtherClaims().get("created-at")).append(":");
        return sb.toString();
    }

    public AccessTokenResponse convertStringToToken(String strToken) {
        String[] str = strToken.split(":");

        var token = new AccessTokenResponse();
        token.setToken(str[0]);
        token.setExpiresIn(Integer.parseInt(str[1]));
        token.setRefreshExpiresIn(Integer.parseInt(str[2]));
        token.setRefreshToken(str[3]);
        token.setTokenType(str[4]);
        token.setIdToken(str[5]);
        token.setNotBeforePolicy(Integer.parseInt(str[6]));
        token.setSessionState(str[7]);
        token.setScope(str[8]);
        token.setError(str[9]);
        token.setErrorDescription(str[10]);
        token.setErrorUri(str[11]);
        token.setOtherClaims("created-at", Long.parseLong(str[12]));

        return token;
    }

    public String getKEYCLOAK_URL() {
        return KEYCLOAK_URL;
    }

    public String getREALM() {
        return REALM;
    }

    public String getCLIENT_ID() {
        return CLIENT_ID;
    }

    public String getCLIENT_ID_SECRET() {
        return CLIENT_ID_SECRET;
    }

    public String getCLIENT_ID_ADMIN() {
        return CLIENT_ID_ADMIN;
    }

    public String getCLIENT_ID_ADMIN_SECRET() {
        return CLIENT_ID_ADMIN_SECRET;
    }
}
