# Era1 - Etkinlik Yönetimi Uygulaması

## Amaç
Era1, kullanıcıların etkinlik oluşturabileceği, etkinliklere katılabileceği ve etkinlikler hakkında yorum yapabileceği bir etkinlik yönetim platformudur. Bu repository aşağıdaki modülleri içerir:
- **Frontend**: React.js tabanlı, duyarlı (responsive) kullanıcı arayüzü.
- **Auth API**: Kullanıcı kimlik doğrulaması ve profil yönetimini sağlar.
- **Event API**: Etkinlik yönetimi, kullanıcı katılımı ve yorumları yönetir.

## Yapı
- `frontend/`: React.js frontend kodunu içerir.
- `authApi/`: Kullanıcı kimlik doğrulaması için Node.js backend.
- `eventApi/`: Etkinlik ve yorum yönetimi için backend.

## Dal Stratejisi
- `main`: Üretime hazır, stabil kod.
- `test`: Test ve hata ayıklama için kullanılır.
- `prod`: Üretim dağıtımı için son versiyon.

## Talimatlar
- Bu repository'i klonlayın.
- Her bir modül için kurulum ve kullanım talimatları README dosyalarında bulunmaktadır.
