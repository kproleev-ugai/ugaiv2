# app/services/ldap.py
import ldap
from app.core.config import settings

class LDAPClient:
    def __init__(self):
        self.server = settings.LDAP_SERVER
        self.base_dn = settings.LDAP_BASE_DN
        self.bind_dn = settings.LDAP_BIND_DN
        self.bind_password = settings.LDAP_BIND_PASSWORD
    
    def connect(self):
        conn = ldap.initialize(self.server)
        conn.simple_bind_s(self.bind_dn, self.bind_password)
        return conn
    
    def authenticate(self, username, password):
        try:
            conn = self.connect()
            
            # Поиск пользователя
            search_filter = f"(sAMAccountName={username})"
            result = conn.search_s(
                self.base_dn,
                ldap.SCOPE_SUBTREE,
                search_filter,
                ["cn", "mail", "givenName", "sn"]
            )
            
            if not result:
                return None
            
            user_dn = result[0][0]
            user_attrs = result[0][1]
            
            # Проверка пароля
            try:
                auth_conn = ldap.initialize(self.server)
                auth_conn.simple_bind_s(user_dn, password)
                
                # Если дошли до сюда, аутентификация успешна
                return {
                    "name": user_attrs.get("cn", [b""])[0].decode("utf-8"),
                    "email": user_attrs.get("mail", [b""])[0].decode("utf-8"),
                    "first_name": user_attrs.get("givenName", [b""])[0].decode("utf-8"),
                    "last_name": user_attrs.get("sn", [b""])[0].decode("utf-8"),
                }
            except ldap.INVALID_CREDENTIALS:
                return None
        except Exception as e:
            print(f"LDAP error: {e}")
            return None
        finally:
            conn.unbind_s()