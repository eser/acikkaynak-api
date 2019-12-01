# [acikkaynak-api](https://github.com/acikkaynak/acikkaynak-api)

[![derleme durumu][build-image]][build-url]
[![bağımlılıklar][dep-image]][dep-url]
[![kapsam durumu][coverage-image]][coverage-url]
[![lisans][license-image]][license-url]

## BENİ OKU

Bu kod tabanında, şu anda yapım aşamasında bulunan [api.acik-kaynak.org](https://api.acik-kaynak.org/)'nun önizleme sürümü yer almaktadır.

`master` branch'ine aktarılan değişiklikler, bir dizi derleme işleminden sonra [https://api.acik-kaynak.org/](https://api.acik-kaynak.org/) adresinde belirecektir.


## Katkı Sağlamak

### Çalışma Ortamını Hazırlamak

`node.js`'in ve `yarn`'ın sisteminizde kurulu olduğundan emin olun.

Repository'i klonlayıp, npm üzerinden bağımlılıkları çekerek çalışma ortamınızı hazır hale getirin.

```sh
$ git clone https://github.com/acikkaynak/acikkaynak-api.git
$ cd acikkaynak-api
$ yarn install
```

`.env.sample` dosyasının bir kopyasını `.env` ismi ile oluşturun ve dosyada bulunan ayarları girin.

### Çalışmaya Başlamak

`yarn dev` komutu ile geliştirme modunda kod tabanına müdahale etmeye başlayabilirsiniz. Komutu çalıştırdıktan bir süre
sonra API'a ait endpoint'ler erişilebilir olacak, siz değişiklik yaptığınız sürece kod otomatik olarak güncellenecektir.


### Çalışmayı Kontrol Etmek

`yarn lint` komutu ile yazılan kodun belirlenen eslint standartlarına uyup uymadığını kontrol edebilirsiniz. Eğer bu
kontrolü yapmazsanız Pull Request oluşturduğunuzda GitHub tarafından bu kontroller otomatik işletilecek ve açmış olduğunuz
Pull Request'i sizden güncellemenizi isteyecektir.

Bazı kod standartları otomatik olarak düzeltilebilmektedir, bunu sağlamak için `yarn lint:fix` komutunu kullanabilirsiniz.

Aynı zamanda yazmış olduğunuz birim testlerini `yarn test` komutu ile başlatabilirsiniz. Testler de aynı lint işlemi gibi
hem pull request hem de push esnasında GitHub Actions tarafından CI/CD otomasyonuna bağlı olarak çalıştırılmaktadır.

### API Fonksiyonlarını AWS'e Yükleme

- Amazon Web Services'dan Access Keylerinizi temin edin ve aws-cli aracılığıyla AWS hesabınızı sisteminize tanıtın.

```sh
$ aws configure
AWS Access Key ID [None]: KEY
AWS Secret Access Key [None]: SECRET
Default region name [None]: eu-west-1
Default output format [None]: 
```

- `.env` dosyasında uygulamanın bağlanacağı MongoDB connection string'i v.b. ayarları belirttiğinizden emin olun.

- `serverless.yml` dosyası içerisine bir göz gezdirin.

- Her şey hazır ise AWS üzerine yüklemenizi gerçekleştirebilirsiniz.

```sh
$ yarn deploy:prod
```


## Dizin Yapısı

| Klasör                                          | Açıklama                                                        |
|-------------------------------------------------|-----------------------------------------------------------------|
| `/src/`                                         | Kaynak dosyalarını içeren klasör                                |
| `/src/actions/`                                 | API'lara ait fonksiyonları içeren klasör                        |
| `/src/shared/`                                  | API fonksiyonlarının ortak kullandığı yapılar                   |
| `/serverless.yml`                               | Serverless framework konfigurasyonu                             |


## Yapılacaklar

[GitHub Projesi](https://github.com/orgs/acikkaynak/projects/1) üzerinde detaylar yer almaktadır.


## Gereksinimler

* node.js (https://nodejs.org/)


## Lisans

Apache 2.0, daha fazla detay için lütfen [LICENSE](LICENSE) dosyasını inceleyin.


## Katkı Sağlayanlar

[contributors.md](contributors.md) dosyasını inceleyebilirsiniz.

Herhangi bir katkıya açıktır. Hata düzenlemeleri, yeni özellik ve modüller ekleyebilirsiniz.

* Koda katkı sağlamak için: Yukarıda anlatıldığı gibi repository'i klonlayın, değişikliklerinizi gerçekleştirin, ve bir pull request oluşturun.
* Bir hata bildirmek için: Bir şeyler ters gidiyorsa, [GitHub Issues](https://github.com/acikkaynak/acikkaynak-api/issues) üzerinden yeni bir issue oluşturup bize bildirin.


[build-image]: https://github.com/acikkaynak/acikkaynak-api/workflows/CI/badge.svg
[build-url]: https://github.com/acikkaynak/acikkaynak-api/actions?workflow=CI
[dep-image]: https://img.shields.io/david/acikkaynak/acikkaynak-api.svg?style=flat-square
[dep-url]: https://github.com/acikkaynak/acikkaynak-api
[coverage-image]: https://img.shields.io/codecov/c/gh/acikkaynak/acikkaynak-api/master.svg?style=flat-square
[coverage-url]: https://codecov.io/gh/acikkaynak/acikkaynak-api
[license-image]: https://img.shields.io/github/license/acikkaynak/acikkaynak-api.svg?style=flat-square
[license-url]: https://github.com/acikkaynak/acikkaynak-api/blob/master/LICENSE
