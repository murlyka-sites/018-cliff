$(document).ready(function() {

	(function() {
		var $track = $(".menu-levels-mobile__track"),
				width = $track.children().length * 256;

		$(".menu-levels-mobile__track").css('width', width + 'px')
	})()

	$(".firm__header_home .toggle-buttons__button").click(function() {
		if($(this).hasClass('toggle-buttons__button_active')) {

			$(this).toggleClass('toggle-buttons__button_no-active')
			$(".firm__items").toggleClass("firm__items_visible")
			$('.asst__collapse').collapse('show');
		} else {
			$(".firm__items").addClass("firm__items_visible")
			$(this).parent().find('.toggle-buttons__button_active').removeClass('toggle-buttons__button_active');
			$(this).parent().find('.toggle-buttons__button_no-active').removeClass('toggle-buttons__button_no-active');
			$(this).addClass('toggle-buttons__button_active');
			$('.asst__collapse').collapse('hide');
		}
	});
	$(".firm__header_internal .toggle-buttons__button").click(function() {
		if($(this).hasClass('toggle-buttons__button_active')) {
			$(this).removeClass('toggle-buttons__button_active')
			$(".firm__items").toggleClass("firm__items_visible")
			$('.asst_1').collapse('hide');
		} else {
			$(".firm__items").addClass("firm__items_visible")
			$(this).parent().find('.toggle-buttons__button_active').removeClass('toggle-buttons__button_active');
			$(this).addClass('toggle-buttons__button_active');
			$('.asst_1').collapse('show');
		}
	});

	$(".fancy").fancybox({
		padding: 0,
		scrolling: 'visible',
		helpers : {
			overlay : {
				css : {
					'background' : 'rgba(55, 115, 123, 0.7)'
				}
			}
		}
	});

	var slideout = new Slideout({
		'panel': document.getElementById('swipes'),
		'menu': document.getElementById('mobile-menu'),
		'padding': 256,
		'tolerance': 70
	});

	$(".nav__trigger").click(function() {
		$(this).toggleClass('nav__trigger_open');
		$(".mobile-menu").toggleClass('mobile-menu_open');
		$(".swipes").toggleClass('swipes_open');
		slideout.toggle();
	});

	$('input[type=checkbox], input[type=radio').customRadioCheckbox();

	$('.firm__item_empty').click(function() {

		$.fancybox.open("#no-company", {
			padding: 0,
			margin: 0,
			// autoHeight: true,
			scrolling: 'visible',
			helpers : {
				overlay : {
					css : {
					'background' : 'rgba(55, 115, 123, 0.7)'
					}
				}
			}
		});

		return false;
	})

	$('.menu-levels-mobile__up-level').click(function() {
		$('.menu-levels-mobile__track').css('left', '-=256');
		$($(this).data('nextLevel')).find('.menu-levels-mobile__branch_active').removeClass('menu-levels-mobile__branch_active');
		$($(this).data('target')).addClass('menu-levels-mobile__branch_active');
	});

	$('.menu-levels-mobile__down-level').click(function() {
		$('.menu-levels-mobile__track').css('left', '+=256');
	});

	$('.asst__collapse').on('shown.bs.collapse hidden.bs.collapse', function () {
		$('.asst__header-text').toggleClass('asst__header-text_open')
	})

	$('.praxis-item__inq-check input').change(function() {
		var count = $('.praxis-item__inq-check input[type=checkbox]:checked').length;
		$('.praxis-req__btn-count_selected').text(count);

		if(!count) {
			$('.praxis-req__btn_selected').prop("disabled", true);
		} else {
			$('.praxis-req__btn_selected').prop("disabled", false);
		}

	});

	$('.pa-cell__btn-collapse').click(function() {

		$(this).closest(".pa-grid__cell").toggleClass("pa-grid__cell_close");

	});

	//отправка файла на сервер


});

$(document).ready(function() {
	var dropZone = $('.pa-create__drop'),
			maxFileSize = 1000000;

	$(".pa-create__open-file input").change(function() {

			var file = $(this).serialize();

			// Проверяем размер файла
			if (file.size > maxFileSize) {
					dropZone.text('Файл слишком большой!');
					dropZone.addClass('pa-create__drop_error');
					return false;
			}

			// Создаем запрос
			var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener('progress', uploadProgress, false);
			xhr.onreadystatechange = stateChange;
			xhr.open('POST', 'upload.php');
			xhr.setRequestHeader('X-FILE-NAME', file.name);
			xhr.send(file);
	});



	// Проверка поддержки браузером
	if (typeof(window.FileReader) == 'undefined') {
			dropZone.text('Не поддерживается браузером!');
			dropZone.addClass('pa-create__drop_error');

	}

		// Добавляем класс hover при наведении
		dropZone[0].ondragover = function() {
				dropZone.addClass('pa-create__drop_hover');
				return false;
		};

		dropZone[0].ondragenter = function() {
				dropZone.addClass('pa-create__drop_hover');
				return false;

		};

		// Убираем класс hover
		dropZone[0].ondragleave = function() {
				dropZone.removeClass('pa-create__drop_hover');
				return false;
		};

		// Обрабатываем событие Drop
		dropZone[0].ondrop = function(event) {
				event.preventDefault();
				dropZone.removeClass('hover');
				dropZone.addClass('drop');

				var file = event.dataTransfer.files[0];

				// Проверяем размер файла
				if (file.size > maxFileSize) {
						dropZone.text('Файл слишком большой!');
						dropZone.addClass('pa-create__drop_error');
						return false;
				}

				// Создаем запрос
				var xhr = new XMLHttpRequest();
				xhr.upload.addEventListener('progress', uploadProgress, false);
				xhr.onreadystatechange = stateChange;
				xhr.open('POST', 'upload.php');
				xhr.setRequestHeader('X-FILE-NAME', file.name);
				xhr.send(file);
		};

		// Показываем процент загрузки
		function uploadProgress(event) {
				var percent = parseInt(event.loaded / event.total * 100);
				dropZone.text('Загрузка: ' + percent + '%');
		}

		// Пост обрабочик
		function stateChange(event) {
				if (event.target.readyState == 4) {
						if (event.target.status == 200) {
								dropZone.text('Загрузка успешно завершена!');
						} else {
								dropZone.text('Произошла ошибка!');
								dropZone.addClass('pa-create__drop_error');
						}
				}
		}
});
