import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const dynamic = "force-dynamic";

type Dish = {
  _id: string;
  name: string;
  price: number;
  description?: string;
  image?: any;
  available?: boolean;
  order?: number;
};

type Category = {
  _id: string;
  title: string;
  order?: number;
  dishes: Dish[];
};

type SiteSettings = {
  name?: string;
  description?: string;
  heroImage?: any;
  logo?: any;

  address?: string;
  phone?: string;
  workingHours?: string;

  mapUrl?: string;
  telegramUrl?: string;
  socialUrl?: string;

  aboutTitle?: string;
  aboutText?: string;
  aboutImage?: any;
};

export default async function Home() {
  const settings: SiteSettings | null = await client.fetch(`
    *[_type == "siteSettings"][0]{
      name,
      description,
      heroImage,
      logo,
      address,
      phone,
      workingHours,
      mapUrl,
      telegramUrl,
      socialUrl,
      aboutTitle,
      aboutText,
      aboutImage
    }
  `);

  const categories: Category[] = await client.fetch(`
    *[_type == "category"] | order(order asc){
      _id,
      title,
      order,

      "dishes": *[
        _type == "dish" &&
        references(^._id) &&
        available == true
      ] | order(order asc){
        _id,
        name,
        price,
        description,
        image,
        available,
        order
      }
    }
  `);

  const visibleCategories = categories.filter(
    (category) => category.dishes.length > 0
  );

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-[#f5f1e8]">

      {/* HEADER */}
      <header className="absolute left-0 top-0 z-30 w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10 lg:px-12">
          
          <a href="#" className="flex items-center gap-3">
            {settings?.logo && (
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white">
                <img
                  src={urlFor(settings.logo)
                    .width(140)
                    .url()}
                  alt={settings.name || "Логотип"}
                  className="h-full w-full object-contain"
                />
              </div>
            )}

            <span className="text-base font-semibold tracking-tight md:text-lg">
              {settings?.name || "Кафе"}
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#about"
              className="text-sm text-white/70 transition hover:text-white"
            >
              О нас
            </a>

            <a
              href="#menu"
              className="text-sm text-white/70 transition hover:text-white"
            >
              Меню
            </a>

            <a
              href="#contacts"
              className="text-sm text-white/70 transition hover:text-white"
            >
              Контакты
            </a>
          </nav>

          {settings?.mapUrl && (
            <a
              href={settings.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#f5f1e8] px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
            >
              <span className="hidden sm:inline">
                Построить маршрут
              </span>

              <span className="sm:hidden">
                Маршрут
              </span>
            </a>
          )}
        </div>
      </header>

      {/* HERO */}
      <section className="relative flex min-h-[680px] items-end overflow-hidden md:min-h-[760px]">
        
        {settings?.heroImage && (
          <img
            src={urlFor(settings.heroImage)
              .width(2000)
              .height(1200)
              .url()}
            alt={settings.name || "Кафе"}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/25" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 md:px-10 md:pb-20 lg:px-12">
          
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-white/60">
            Кофейня · Москва
          </p>

          <h1 className="max-w-5xl text-6xl font-semibold leading-[0.9] tracking-[-0.05em] md:text-8xl lg:text-[110px]">
            {settings?.name || "Наше кафе"}
          </h1>

          {settings?.description && (
            <p className="mt-7 max-w-xl text-lg leading-7 text-white/75 md:text-xl">
              {settings.description}
            </p>
          )}

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#menu"
              className="rounded-full bg-[#f5f1e8] px-6 py-3.5 font-medium text-black transition hover:scale-[1.02]"
            >
              Посмотреть меню
            </a>

            {settings?.mapUrl && (
              <a
                href={settings.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/25 bg-white/5 px-6 py-3.5 font-medium text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Построить маршрут
              </a>
            )}
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto max-w-7xl px-6 pt-24 pb-12 md:px-10 md:py-32 lg:px-12"
      >
        <div className="grid gap-12 md:grid-cols-2 md:items-center lg:gap-20">

          {settings?.aboutImage && (
            <div className="overflow-hidden rounded-[32px]">
              <img
                src={urlFor(settings.aboutImage)
                  .width(1200)
                  .height(1500)
                  .url()}
                alt={settings.aboutTitle || "О нас"}
                className="aspect-[4/5] h-full w-full object-cover"
              />
            </div>
          )}

          <div className="md:py-10">
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#a79f90]">
              О заведении
            </p>

            <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-[-0.03em] md:text-6xl">
              {settings?.aboutTitle || "Место, куда хочется возвращаться"}
            </h2>

            {settings?.aboutText && (
              <p className="mt-8 max-w-xl whitespace-pre-line text-lg leading-8 text-[#aaa49a]">
                {settings.aboutText}
              </p>
            )}

            <div className="mt-10 border-t border-white/10 pt-8">
              <div className="grid gap-6 sm:grid-cols-2">

                {settings?.workingHours && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#777168]">
                      Работаем
                    </p>

                    <p className="mt-2 text-lg">
                      {settings.workingHours}
                    </p>
                  </div>
                )}

                {settings?.address && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#777168]">
                      Адрес
                    </p>

                    <p className="mt-2 text-lg">
                      {settings.address}
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MENU */}
      <section
        id="menu"
        className="border-y border-white/10 bg-[#11100e]"
      >
        <div className="mx-auto max-w-7xl px-6 pt-12 pb-24 md:px-10 md:py-32 lg:px-12">

          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#a79f90]">
                Наше меню
              </p>

              <h2 className="text-5xl font-semibold tracking-[-0.04em] md:text-7xl">
                Меню
              </h2>
            </div>

            <p className="max-w-md text-[#8f8a82]">
              Кофе, завтраки и десерты, которые можно выбрать прямо на сайте.
            </p>
          </div>

          <div className="space-y-24">

            {visibleCategories.map((category) => (
              <section key={category._id}>

                <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-5">
                  <h3 className="text-3xl font-medium md:text-4xl">
                    {category.title}
                  </h3>

                  <span className="text-sm text-[#777168]">
                    {category.dishes.length} поз.
                  </span>
                </div>

                <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">

                  {category.dishes.map((dish) => (
                    <article
                      key={dish._id}
                      className="group overflow-hidden rounded-[28px] bg-[#171614]"
                    >

                      {dish.image && (
                        <div className="overflow-hidden">
                          <img
                            src={urlFor(dish.image)
                              .width(900)
                              .height(700)
                              .url()}
                            alt={dish.name}
                            className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          />
                        </div>
                      )}

                      <div className="p-5 md:p-6">

                        <div className="flex items-start justify-between gap-6">

                          <h4 className="text-xl font-medium md:text-2xl">
                            {dish.name}
                          </h4>

                          <p className="whitespace-nowrap text-lg font-medium">
                            {dish.price} ₽
                          </p>

                        </div>

                        {dish.description && (
                          <p className="mt-3 max-w-sm leading-6 text-[#8f8a82]">
                            {dish.description}
                          </p>
                        )}

                      </div>
                    </article>
                  ))}

                </div>
              </section>
            ))}

          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section
        id="contacts"
        className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32 lg:px-12"
      >
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">

          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#a79f90]">
              Контакты
            </p>

            <h2 className="max-w-2xl text-5xl font-semibold leading-tight tracking-[-0.04em] md:text-7xl">
              Приходите в гости
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#8f8a82]">
              Загляните на кофе, завтрак или просто провести время в приятной атмосфере.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">

              {settings?.mapUrl && (
                <a
                  href={settings.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#f5f1e8] px-6 py-3.5 font-medium text-black transition hover:scale-[1.02]"
                >
                  Построить маршрут
                </a>
              )}

              {settings?.telegramUrl && (
                <a
                  href={settings.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-6 py-3.5 transition hover:bg-white/5"
                >
                  Telegram
                </a>
              )}

              {settings?.socialUrl && (
                <a
                  href={settings.socialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-6 py-3.5 transition hover:bg-white/5"
                >
                  Соцсети
                </a>
              )}

            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[#11100e] p-8 md:p-10">

            {settings?.address && (
              <div className="border-b border-white/10 pb-7">
                <p className="text-xs uppercase tracking-[0.2em] text-[#777168]">
                  Адрес
                </p>

                <p className="mt-3 text-xl">
                  {settings.address}
                </p>
              </div>
            )}

            {settings?.phone && (
              <div className="border-b border-white/10 py-7">
                <p className="text-xs uppercase tracking-[0.2em] text-[#777168]">
                  Телефон
                </p>

                <a
                  href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}
                  className="mt-3 block text-xl transition hover:text-[#c7bfae]"
                >
                  {settings.phone}
                </a>
              </div>
            )}

            {settings?.workingHours && (
              <div className="pt-7">
                <p className="text-xs uppercase tracking-[0.2em] text-[#777168]">
                  Режим работы
                </p>

                <p className="mt-3 text-xl">
                  {settings.workingHours}
                </p>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#070707]">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-12">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <a href="#" className="flex items-center gap-3">

              {settings?.logo && (
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white">
                  <img
                    src={urlFor(settings.logo)
                      .width(100)
                      .url()}
                    alt={settings.name || "Логотип"}
                    className="h-full w-full object-contain"
                  />
                </div>
              )}

              <span className="font-semibold">
                {settings?.name || "Кафе"}
              </span>
            </a>

            <nav className="flex flex-wrap gap-7 text-sm text-[#8f8a82]">
              <a
                href="#about"
                className="transition hover:text-white"
              >
                О нас
              </a>

              <a
                href="#menu"
                className="transition hover:text-white"
              >
                Меню
              </a>

              <a
                href="#contacts"
                className="transition hover:text-white"
              >
                Контакты
              </a>
            </nav>

            <p className="text-sm text-[#66615b]">
              © {new Date().getFullYear()} {settings?.name || "Кафе"}
            </p>

          </div>

        </div>
      </footer>

    </main>
  );
}