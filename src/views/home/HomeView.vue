<script setup lang="ts">
	import { ref } from 'vue';
	import type { IHeroCard } from './hero/heroTypes';
	import ButtonApp from '@/components/Button/ButtonApp.vue';
	import HeroSlider from '@/views/home/hero/HeroSlider.vue';

	const cards = ref<IHeroCard[]>([
		{
			name: 'Бесстыжие. 11 сезон. Финал',
			image: 'poster1.1.png',
			tags: ['Премьера'],
			date: '13 мая',
			id: 1,
		},
		{
			name: 'Дом в лесу. 1 сезон. Финал',
			image: 'poster1.2.png',
			tags: ['Премьера'],
			date: '12 декабря',
			id: 2,
		},
		{
			name: 'Мегамозг',
			image: 'poster1.3.png',
			tags: ['Мультфильм'],
			date: '18 апреля',
			id: 3,
		},
		{
			name: 'Спасатели Малибу',
			image: 'poster1.4.png',
			tags: ['Фильм', 'Комедия'],
			date: '8 февраля',
			id: 4,
		},
		{
			name: 'День Сурка',
			image: 'poster1.5.png',
			tags: ['Фильм', 'Мелодрама', 'Фэнтези'],
			date: '30 июня',
			id: 5,
		},
		{
			name: 'Test 1',
			image: '',
			tags: ['Фильм', 'Фэнтези'],
			date: '30 июня',
			id: 6,
		},
		{
			name: 'Test 2',
			image: '',
			tags: ['Фильм', 'Мелодрама', 'Фэнтези'],
			date: '30 июня',
			id: 7,
		},
	]);
</script>

<template>
	<div class="home">
		<h1 class="visually-hidden title">Главная страница</h1>
		<div class="hero">
			<div class="hero-content">
				<h2 class="hero-title">Самые сочные премьеры кино — у вас дома</h2>
				<p class="hero-text">
					Ежедневно пополняемая библиотека с лучшими фильмами и сериалами — в дубляже и
					оригинале.Целый месяц бесплатно!
				</p>
				<ButtonApp class="hero-btn"> Смотреть бесплатно </ButtonApp>
			</div>

			<div class="hero-slider">
				<HeroSlider :cards="cards" />
			</div>
		</div>
    <section class="big-text">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum alias ab eveniet eligendi saepe error tenetur quo cupiditate veniam nisi sapiente hic natus, itaque amet vero, sit omnis. Dolorem repellat nihil assumenda nostrum magni mollitia dicta eaque eligendi numquam enim consequatur, temporibus cum doloremque eum harum! Accusamus laudantium porro dolorum? Vitae labore molestias veniam pariatur eum! Praesentium optio, repudiandae eius ab delectus, ipsa quo pariatur eligendi nesciunt perspiciatis sit sed doloribus atque mollitia nulla repellendus sapiente voluptate ea magni? A, iste nisi reiciendis architecto dolorem natus, molestiae aliquid quasi tempore autem doloribus rerum iusto cum maiores, magnam veniam fugiat eveniet officia consequatur aspernatur harum. Reprehenderit officia quibusdam ex corrupti aliquid quasi consequuntur veritatis sed dolor dolore eos voluptate accusantium accusamus voluptas ipsa illo, tempora tempore voluptatem ut laudantium nisi deserunt veniam. Amet rem labore, dolore doloremque aperiam facere culpa eius! Incidunt voluptas praesentium consectetur accusantium animi odit labore id maiores totam ratione vero suscipit ipsam placeat qui, sunt nisi ad dolor quaerat omnis dolorum ipsa fugiat, aut ex? Eveniet dolores adipisci doloribus quos sapiente eum enim perspiciatis debitis hic libero ex, dicta, suscipit facilis facere sit necessitatibus quis magni sunt amet aliquid deleniti fugiat, exercitationem explicabo! Voluptatum deserunt eos numquam, modi veniam quia dolor sint reiciendis est dignissimos labore ipsum unde nam obcaecati exercitationem temporibus suscipit quis dolorum laboriosam enim consectetur nostrum. Cum doloremque eveniet libero veniam nisi neque impedit quam totam id necessitatibus amet explicabo voluptate tenetur molestias repellat earum magni, velit architecto eaque repellendus? Qui iusto non nisi ex ut dignissimos et incidunt nobis ipsum natus, ipsam consectetur? Consectetur aspernatur esse harum inventore optio, nobis sequi repellendus quisquam soluta. Aut, eos asperiores maxime quo enim esse voluptatibus, minus reprehenderit exercitationem corrupti magnam omnis dolore. Sed, itaque eveniet officiis magnam pariatur blanditiis beatae porro maxime cum natus? Sequi non nihil impedit quos exercitationem veritatis? Illum nulla optio neque officiis, libero dolorum obcaecati, velit non omnis repellat recusandae! Perspiciatis minus molestias voluptatibus itaque fugiat. Perferendis, accusamus quisquam soluta quas cumque odit velit tenetur sint excepturi nobis placeat in blanditiis architecto voluptatum libero officiis voluptate. Nam voluptatem iusto dolore voluptate quam blanditiis tenetur dolores laboriosam ut beatae, nobis accusamus similique sit ullam, consectetur et excepturi veritatis veniam culpa eligendi ratione! Rem quam dolorum iusto nam. Voluptate, dolores aperiam nulla nostrum minus consectetur commodi voluptatibus ea enim dolorum et eius eveniet magnam, non ducimus quam? Ullam quidem id dolorum esse fuga provident nisi sint ipsum nostrum maiores? Adipisci, iste! Inventore autem provident soluta doloremque laboriosam, nostrum fugit officiis mollitia temporibus illum aliquam sequi dolores nesciunt a exercitationem, dicta fugiat. Officia amet numquam pariatur a? Hic fugit earum assumenda tempora architecto aspernatur dolor recusandae facilis unde illum aut quod, minima commodi a deleniti ipsa nemo quibusdam officiis ea! Amet ratione eius similique sint repellendus rem? Voluptatem nesciunt sit temporibus cumque dicta consectetur voluptate atque culpa placeat sed ex nulla, iste non reprehenderit et, voluptatum, quasi iusto. Cupiditate atque delectus nobis, commodi assumenda iusto explicabo saepe qui ex alias nulla reiciendis recusandae soluta, illo est sunt, officiis sapiente adipisci sint iure omnis illum voluptatibus! Similique corporis perferendis non eaque earum quod quos excepturi, iste eligendi doloribus quisquam, esse aliquam hic, officia dicta culpa accusantium sint iure assumenda porro neque corrupti quam rem amet. Eius totam dolore accusantium tempora id. Recusandae tempore modi repellendus, voluptatum aliquid, debitis animi perspiciatis tenetur id odit maiores tempora cumque. Doloremque, illo ea eligendi voluptatem quisquam nisi ipsam alias velit natus ullam repellat officiis laborum voluptate. Tenetur doloremque voluptatem nesciunt dolor quo alias eum ullam, eos sapiente laudantium illo delectus, nulla nam fugiat nemo sit eligendi atque unde. Sit doloremque, impedit at nesciunt beatae illum minima assumenda perferendis asperiores, dolorum quia tempora magni natus voluptate vitae eius quibusdam aliquam, fuga alias hic quaerat dolores quasi quos placeat! Quas a libero officia ad amet ex doloribus necessitatibus molestiae modi quasi blanditiis mollitia dolorum aut magni pariatur et dolore, enim doloremque repudiandae hic aspernatur nihil est distinctio. Facere earum accusantium quibusdam vel consequuntur. Labore ut repellendus nisi nam tempore in doloremque laborum fugiat molestiae dicta delectus, placeat odit eligendi aut ipsum et dolor quidem facilis dolores quam assumenda nihil eaque. Officia, facilis, placeat enim minus eveniet repudiandae excepturi temporibus, quae provident consequatur ipsam consectetur odio sint! Asperiores modi officia quaerat quia culpa! Beatae nobis aperiam consectetur soluta nam dolores repellendus deserunt nostrum voluptatibus! Vero earum pariatur eius ipsam fugiat ipsa! Magnam quam modi adipisci dolor fugiat laboriosam quibusdam blanditiis quasi sit obcaecati enim itaque, animi eius excepturi harum, eos fugit, accusantium sunt! Culpa voluptates illo delectus numquam amet blanditiis eveniet, animi distinctio fugiat quod quibusdam? Repellendus assumenda culpa facilis, repellat tenetur perferendis iusto fugiat quis voluptas neque, eveniet inventore vitae ducimus doloremque temporibus cupiditate officia officiis illum cum, veniam atque quod dicta dolorum nihil! Reiciendis incidunt obcaecati ex recusandae, minus voluptas sit pariatur amet eius saepe tenetur ea rem corporis natus veniam sequi sapiente assumenda at aut deserunt alias perspiciatis et laboriosam! Amet reprehenderit voluptatem dolorum? Doloremque ad non porro odit dicta id nulla, quibusdam autem minus quisquam ratione facilis illo, blanditiis nesciunt saepe dignissimos quasi quam mollitia adipisci reiciendis? Quo cum, sed et temporibus dolorum nesciunt recusandae est veniam perspiciatis! Error laboriosam enim dolor, cupiditate dolores explicabo culpa suscipit facere odio quas! Ratione, incidunt? Dicta, provident a explicabo unde eius voluptates, architecto dolorum necessitatibus deleniti iure accusantium at quas. Ipsa, odit? Ducimus corrupti velit in molestias atque fuga, vero magni optio aperiam natus cumque nulla officiis corporis consequatur accusamus minus excepturi? Molestiae illum unde pariatur, eum amet sit quod similique praesentium reiciendis in recusandae aut sed aliquam inventore sapiente? Odio laborum fugit commodi nostrum maiores necessitatibus unde reprehenderit mollitia cum laudantium hic dolores doloremque rerum dolor facilis accusantium repudiandae culpa nihil architecto accusamus quis nam voluptatibus, blanditiis in. Rem quisquam voluptatibus iste aut est facilis adipisci enim eligendi animi necessitatibus doloremque fugiat, quos, officia maxime quod inventore! Omnis consectetur quibusdam molestiae ad modi totam pariatur at distinctio id quis perspiciatis sit assumenda, saepe ratione porro magni earum aliquid aut? Doloribus, eligendi. Ipsam, non harum culpa placeat accusantium fugiat, hic rem iure blanditiis exercitationem porro laboriosam praesentium! Fuga neque eligendi, placeat, vel sapiente expedita provident minus, quis accusantium quasi explicabo repellat possimus delectus numquam suscipit reiciendis libero dolor excepturi corporis doloribus. Sed eos repellat consectetur ducimus? Consequatur cum quod repellendus nulla exercitationem id cupiditate adipisci nesciunt, quidem, quaerat corrupti temporibus maiores quas maxime, placeat doloribus ipsa ducimus unde numquam aperiam itaque impedit. Sapiente architecto similique optio deleniti minus dolorem ducimus atque provident accusantium, qui commodi quae, repellat nulla corporis, nostrum facere? Natus ipsam, labore beatae dolorem tempora magni unde nihil consequuntur pariatur neque aspernatur recusandae eum est mollitia a hic eligendi. At cumque temporibus quidem blanditiis quo iste nesciunt facere, doloribus totam excepturi molestiae, illo vero! Perferendis reiciendis voluptas velit omnis nam vel corrupti nulla numquam, non quibusdam quisquam culpa itaque deleniti a ea laboriosam laborum molestias! Nam, asperiores pariatur dicta est enim omnis cum. Labore explicabo aliquam voluptas odit quos voluptatibus inventore fugiat commodi impedit! Repudiandae, hic at adipisci eveniet autem rem, cupiditate, dolore optio iure aliquam iste architecto dolorem voluptatum voluptatem nisi ducimus consectetur labore quo nostrum quod similique totam repellat! Eum necessitatibus expedita libero sed! Laborum eveniet ratione odio non. Officiis sapiente mollitia aut porro temporibus totam necessitatibus eveniet est? Sunt labore commodi deleniti iure odit pariatur rem repellat veniam totam nesciunt explicabo atque quae eveniet officiis quo incidunt laboriosam beatae ratione consequuntur, laudantium vero. Sapiente, expedita necessitatibus soluta a vitae nostrum adipisci aliquam aut asperiores totam voluptatem nobis voluptas hic rerum deleniti quis magni similique quidem facilis. Nesciunt asperiores officiis accusantium harum voluptatibus perferendis quae, praesentium architecto, consequatur inventore incidunt explicabo soluta rem, dolorum consequuntur rerum officia amet necessitatibus. Harum explicabo at aut earum! Architecto nisi voluptatum provident adipisci voluptas sit quo quod ipsa facere, iure nesciunt, assumenda qui deserunt, velit debitis atque iste nulla magni praesentium laborum beatae! Voluptatum voluptas eveniet corporis sapiente aperiam laborum suscipit aliquid temporibus minima, sit labore aut aliquam nulla quas est voluptates ad accusantium harum quis vitae architecto? Recusandae eveniet error odio distinctio perferendis illum velit facere! Similique minus quidem eos expedita blanditiis temporibus. Perferendis ipsam repudiandae asperiores consequuntur tempora magnam maiores, nihil quis tenetur eveniet reiciendis quasi maxime voluptatem? Aut ex voluptas saepe accusamus harum, debitis qui. Exercitationem, at? Saepe enim suscipit nam. Quam impedit qui nihil sed quo autem possimus nulla. Ea inventore fugit ex adipisci officiis! Doloribus quas, cum recusandae adipisci dolorum magnam voluptate officia, ipsam, nihil amet velit! Nam dignissimos a minus mollitia amet quisquam voluptatem expedita! Asperiores excepturi ad atque quod aut, dolore odio. Cupiditate ratione labore amet ducimus aperiam vero quam, reiciendis tempore aspernatur velit temporibus, dicta ab exercitationem minima corrupti natus possimus nostrum laborum atque impedit? Adipisci voluptatum, corrupti quod dolorum fugiat modi tempore enim excepturi, natus quos reprehenderit alias ipsam amet id magnam vitae possimus facere quaerat quae quas at deserunt fuga tempora eaque. Optio, sint? Eveniet fugiat quasi vitae modi mollitia, dolorum ex dolore ab molestiae omnis doloremque qui ea, libero tempora quidem!
    </section>
	</div>
</template>

<style scoped>
	@import './HomeView.css';
</style>
