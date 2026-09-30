# EGE Robotik Cərrahiyyə saytı

## Lokal başlatmaq
Node.js 22 və ya daha yenisi ilə bu qovluqda `npm start` işlədin.
Sayt: http://localhost:3000
Port tutulubsa PowerShell-də `$env:PORT=4177` və sonra `npm start`.
Əlavə npm paketi quraşdırmaq lazım deyil.

## GitHub-a yükləmək
Bu qovluğun BÜTÜN məzmununu repo kökünə yükləyin — yalnız dist qovluğunu yox.
`.github/workflows/deploy-pages.yml`, `scripts`, `package.json` və `dist` daxil olmalıdır.
GitHub Desktop: File > Add local repository; lazım gəlsə Create a Repository; sonra Publish repository.
Əsas branch main və ya master olmalıdır.

## GitHub Pages-i aktivləşdirmək — ilk dəfə vacibdir
1. Repo > Settings > Pages > Build and deployment > Source: GitHub Actions.
2. Gizli repo üçün plan Pages-i dəstəkləmirsə, uyğun plan və ya public repo tələb olunur.
3. Actions > Deploy website to GitHub Pages > Run workflow.
4. Yaşıl nəticədən sonra sayt linki Settings > Pages və Actions deployment hissəsində görünür.

Pages aktiv edilmədən workflow işə düşərsə configure-pages mərhələsində Not Found xətası ola bilər.
Əvvəl 1-ci addımı edin, sonra Re-run all jobs seçin.
Növbəti main/master push-ları avtomatik yayımlanır.

## Build
`npm run build` nəticəni `_site` qovluğuna yazır. Deploy yalnız bu qovluğu yayımlayır.
Repo alt yolunu yoxlamaq üçün PowerShell:
`$env:SITE_BASE_PATH='/repo-adi'; npm run build`
Kök domain üçün: `Remove-Item Env:SITE_BASE_PATH -ErrorAction SilentlyContinue; npm run build`
Build şəkillərin, videoların, keçidlərin və intro yollarının repo ünvanına uyğunluğunu təmin edir.
Mənbə fayllar dist içində qalır. _site fayllarını əl ilə dəyişməyin.

## Mövcud domain
robotik.notex.az üçün DNS və ya hosting dəyişdirilməyib.
Xüsusi domaini GitHub Pages-ə keçirmək ayrıca Settings > Pages və DNS konfiqurasiyası tələb edir.

## Xarici xidmətlər
Google Fonts, Microsoft Clarity və xarici video/xəritə keçidləri internetdən istifadə edir.
Bu, statik saytdır; server.cjs lokal önbaxış üçündür və GitHub Pages-də işləmir.

Rəsmi təlimat: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages