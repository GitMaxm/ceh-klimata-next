import './index.css';

const About = () => {
  return (
    <div className="about">
      <h2 className="title-1">Обо мне</h2>

      <div className="about-box">
        <img src="/img/logo/about-logo.jpg" alt="Фото команды" className="about-img" />

        <div className="about-text">
          <p>
            «Цех Климата» — это команда, которая уже больше{' '}
            <span className="accent">восьми лет</span> занимается системами{' '}
            <span className="accent">вентиляции</span> и{' '}
            <span className="accent">кондиционирования</span>.
            Мы создаём комфортный микроклимат в квартирах, частных домах и коммерческих помещениях.
          </p>

          <p>
            Выполняем полный цикл работ: от{' '}
            <span className="accent">подбора оборудования</span> и{' '}
            <span className="accent">проектирования</span> до монтажа, настройки и последующего
            обслуживания.
            Следим, чтобы каждая система работала{' '}
            <span className="accent">тихо</span>,{' '}
            <span className="accent">эффективно</span> и{' '}
            <span className="accent">аккуратно вписывалась в интерьер</span>.
          </p>

          <p>
            Используем современные решения:{' '}
            <span className="tech">приточно-вытяжные системы</span>,{' '}
            <span className="tech">канальные кондиционеры</span>,{' '}
            <span className="tech">мультисплит-системы</span>,{' '}
            <span className="tech">VRF</span>,{' '}
            <span className="tech">очистку и увлажнение воздуха</span>.
            Каждый проект подбираем индивидуально — под площадь, задачи и стиль помещения.
          </p>

          <p>
            Мы постоянно развиваемся: изучаем новые технологии, обновляем оборудование и выбираем
            решения, которые дают лучший результат по уровню шума, качеству воздуха и
            энергоэффективности.
          </p>

          <p>
            <span className="accent">Открыты к сотрудничеству</span> — берём проекты с нуля,
            интегрируем системы в готовый ремонт и всегда предлагаем{' '}
            <span className="accent">оптимальное</span>{' '}
            и{' '}
            <span className="accent">эстетичное решение</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export { About };
