const SportModel = require("../../Models/sportModel.cjs");

const Listalinks = [
    {
        "deporte": "Ajedrez",
        "links": [
            [
                "https://sports.bwin.co/es/sports/ajedrez-67/apuestas/mundo-6"
            ]
        ]
    },
    {
        "deporte": "Bádminton",
        "links": [
            [
                "https://sports.bwin.co/es/sports/b%C3%A1dminton-44/apuestas/mundo-6"
            ]
        ]
    },
    {
        "deporte": "Baloncesto",
        "links": [
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/norteam%C3%A9rica-9"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/europa-7"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/espa%C3%B1a-28"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/turqu%C3%ADa-31"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/italia-20"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/argentina-38"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/brasil-33"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/alemania-17"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/arabia-saud%C3%AD-191"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/argelia-69"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/argentina-38"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/australia-60"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/brasil-33"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/china-57"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/chipre-58"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/corea-198"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/croacia-50"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/emiratos-%C3%A1rabes-unidos-219"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/eslovenia-27"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/espa%C3%B1a-28"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/europa-7"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/filipinas-184"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/finlandia-15"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/francia-16"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/grecia-18"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/hungr%C3%ADa-19"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/ir%C3%A1n-136"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/islandia-49"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/israel-62"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/italia-20"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/jap%C3%B3n-52"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/kenia-141"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/lituania-151"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/malasia-66"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/malta-159"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/m%C3%A9xico-43"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/norteam%C3%A9rica-9"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/nueva-zelanda-173"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/polonia-22"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/portugal-37"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/reino-unido-220"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/rep%C3%BAblica-checa-12"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/ruman%C3%ADa-24"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/suecia-29"
            ],
            [
                "https://sports.bwin.co/es/sports/baloncesto-7/apuestas/turqu%C3%ADa-31"
            ]
        ]
    },
    {
        "deporte": "Balonmano",
        "links": [
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/mundo-6"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/europa-7"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/alemania-17"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/francia-16"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/espa%C3%B1a-28"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/polonia-22"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/suecia-29"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/alemania-17"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/austria-8"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/dinamarca-13"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/espa%C3%B1a-28"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/europa-7"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/francia-16"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/hungr%C3%ADa-19"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/islandia-49"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/jap%C3%B3n-52"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/mundo-6"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/noruega-21"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/polonia-22"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/ruman%C3%ADa-24"
            ],
            [
                "https://sports.bwin.co/es/sports/balonmano-16/apuestas/suecia-29"
            ]
        ]
    },
    {
        "deporte": "Béisbol",
        "links": [
            [
                "https://sports.bwin.co/es/sports/b%C3%A9isbol-23/apuestas/mundo-6"
            ],
            [
                "https://sports.bwin.co/es/sports/b%C3%A9isbol-23/apuestas/norteam%C3%A9rica-9"
            ]
        ]
    },
    {
        "deporte": "Billar americano",
        "links": [
            [
                "https://sports.bwin.co/es/sports/billar-americano-38/apuestas/reino-unido-220"
            ]
        ]
    },
    {
        "deporte": "Boxeo",
        "links": [
            [
                "https://sports.bwin.co/es/sports/boxeo-24/apuestas/mundo-6"
            ]
        ]
    },
    {
        "deporte": "Ciclismo",
        "links": []
    },
    {
        "deporte": "Cricket",
        "links": [
            [
                "https://sports.bwin.co/es/sports/cricket-22/apuestas/mundo-6"
            ]
        ]
    },
    {
        "deporte": "Curling",
        "links": []
    },
    {
        "deporte": "Dardos",
        "links": [
            [
                "https://sports.bwin.co/es/sports/dardos-34/apuestas/mundo-6"
            ]
        ]
    },
    {
        "deporte": "Deportes de combate",
        "links": [
            [
                "https://sports.bwin.co/es/sports/deportes-de-combate-45/apuestas/mundo-6"
            ],
            [
                "https://sports.bwin.co/es/sports/deportes-de-combate-45/apuestas/norteam%C3%A9rica-9"
            ]
        ]
    },
    {
        "deporte": "Deportes gaélicos",
        "links": []
    },
    {
        "deporte": "Entretenimiento",
        "links": [
            [
                "https://sports.bwin.co/es/sports/entretenimiento-60/apuestas/estados-unidos-39"
            ],
            [
                "https://sports.bwin.co/es/sports/entretenimiento-60/apuestas/italia-20"
            ],
            [
                "https://sports.bwin.co/es/sports/entretenimiento-60/apuestas/mundo-6"
            ],
            [
                "https://sports.bwin.co/es/sports/entretenimiento-60/apuestas/reino-unido-220"
            ]
        ]
    },
    {
        "deporte": "Esquí alpino",
        "links": [
            [
                "https://sports.bwin.co/es/sports/esqu%C3%AD-alpino-9/apuestas/mundo-6"
            ]
        ]
    },
    {
        "deporte": "Esquí de fondo",
        "links": [
            [
                "https://sports.bwin.co/es/sports/esqu%C3%AD-de-fondo-94/apuestas/mundo-6"
            ]
        ]
    },
    {
        "deporte": "Floorball",
        "links": [
            [
                "https://sports.bwin.co/es/sports/floorball-28/apuestas/mundo-6"
            ]
        ]
    },
    {
        "deporte": "Fórmula 1",
        "links": []
    },
    {
        "deporte": "Fútbol",
        "links": [
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/colombia-45"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/sudam%C3%A9rica-42"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/europa-7"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/espa%C3%B1a-28"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/inglaterra-14"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/italia-20"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/alemania-17"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/francia-16"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/argentina-38"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/brasil-33"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/mundo-6"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/%C3%A1frica-11"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/alemania-17"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/arabia-saud%C3%AD-191"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/argelia-69"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/argentina-38"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/australia-60"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/austria-8"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/bangladesh-80"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/b%C3%A9lgica-35"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/bolivia-44"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/brasil-33"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/bulgaria-63"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/chile-56"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/chipre-58"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/colombia-45"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/costa-rica-104"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/croacia-50"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/dinamarca-13"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/ecuador-110"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/egipto-111"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/el-salvador-112"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/emiratos-%C3%A1rabes-unidos-219"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/escocia-26"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/eslovaquia-51"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/eslovenia-27"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/espa%C3%B1a-28"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/estados-unidos-9"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/etiop%C3%ADa-115"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/europa-7"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/francia-16"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/gales-64"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/grecia-18"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/guatemala-127"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/hungr%C3%ADa-19"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/india-134"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/indonesia-135"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/inglaterra-14"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/iraq-137"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/irlanda-del-norte-65"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/israel-62"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/italia-20"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/jap%C3%B3n-52"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/jordania-139"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/marruecos-166"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/m%C3%A9xico-43"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/mundo-6"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/noruega-21"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/om%C3%A1n-178"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/pa%C3%ADses-bajos-36"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/paraguay-48"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/polonia-22"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/portugal-37"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/qatar-186"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/rep%C3%BAblica-checa-12"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/ruman%C3%ADa-24"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/sud%C3%A1frica-197"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/sudam%C3%A9rica-42"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/suiza-30"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/tailandia-210"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/turqu%C3%ADa-31"
            ],
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-4/apuestas/ucrania-53"
            ]
        ]
    },
    {
        "deporte": "Fútbol americano",
        "links": [
            [
                "https://sports.bwin.co/es/sports/f%C3%BAtbol-americano-11/apuestas/norteam%C3%A9rica-9"
            ]
        ]
    },
    {
        "deporte": "Fútbol sala",
        "links": []
    },
    {
        "deporte": "Golf",
        "links": []
    },
    {
        "deporte": "Hockey sobre hielo",
        "links": [
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/norteam%C3%A9rica-9"
            ],
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/mundo-6"
            ],
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/alemania-17"
            ],
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/rep%C3%BAblica-checa-12"
            ],
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/finlandia-15"
            ],
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/suecia-29"
            ],
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/alemania-17"
            ],
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/austria-8"
            ],
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/canad%C3%A1-94"
            ],
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/dinamarca-13"
            ],
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/eslovaquia-51"
            ],
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/finlandia-15"
            ],
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/francia-16"
            ],
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/mundo-6"
            ],
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/norteam%C3%A9rica-9"
            ],
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/reino-unido-220"
            ],
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/rep%C3%BAblica-checa-12"
            ],
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/suecia-29"
            ],
            [
                "https://sports.bwin.co/es/sports/hockey-sobre-hielo-12/apuestas/suiza-30"
            ]
        ]
    },
    {
        "deporte": "NASCAR",
        "links": []
    },
    {
        "deporte": "Pádel",
        "links": []
    },
    {
        "deporte": "Rugby League",
        "links": [
            [
                "https://sports.bwin.co/es/sports/rugby-league-31/apuestas/australia-60"
            ]
        ]
    },
    {
        "deporte": "Rugby Union",
        "links": [
            [
                "https://sports.bwin.co/es/sports/rugby-union-32/apuestas/mundo-6"
            ],
            [
                "https://sports.bwin.co/es/sports/rugby-union-32/apuestas/europa-7"
            ],
            [
                "https://sports.bwin.co/es/sports/rugby-union-32/apuestas/inglaterra-14"
            ],
            [
                "https://sports.bwin.co/es/sports/rugby-union-32/apuestas/francia-16"
            ],
            [
                "https://sports.bwin.co/es/sports/rugby-union-32/apuestas/europa-7"
            ],
            [
                "https://sports.bwin.co/es/sports/rugby-union-32/apuestas/francia-16"
            ],
            [
                "https://sports.bwin.co/es/sports/rugby-union-32/apuestas/inglaterra-14"
            ],
            [
                "https://sports.bwin.co/es/sports/rugby-union-32/apuestas/mundo-6"
            ]
        ]
    },
    {
        "deporte": "Salto de esquí",
        "links": []
    },
    {
        "deporte": "Snooker",
        "links": [
            [
                "https://sports.bwin.co/es/sports/snooker-33/apuestas/mundo-6"
            ]
        ]
    },
    {
        "deporte": "Surf",
        "links": [
            [
                "https://sports.bwin.co/es/sports/surf-109/apuestas/mundo-6"
            ]
        ]
    },
    {
        "deporte": "Tenis",
        "links": [
            [
                "https://sports.bwin.co/es/sports/tenis-5/apuestas/promociones-16"
            ],
            [
                "https://sports.bwin.co/es/sports/tenis-5/apuestas/torneos-del-grand-slam-5"
            ],
            [
                "https://sports.bwin.co/es/sports/tenis-5/apuestas/wta-7"
            ],
            [
                "https://sports.bwin.co/es/sports/tenis-5/apuestas/itf-m-9"
            ],
            [
                "https://sports.bwin.co/es/sports/tenis-5/apuestas/itf-f-8"
            ],
            [
                "https://sports.bwin.co/es/sports/tenis-5/apuestas/exhibiciones-13"
            ]
        ]
    },
    {
        "deporte": "Tenis de mesa",
        "links": [
            [
                "https://sports.bwin.co/es/sports/tenis-de-mesa-56/apuestas/polonia-22"
            ],
            [
                "https://sports.bwin.co/es/sports/tenis-de-mesa-56/apuestas/rep%C3%BAblica-checa-12"
            ]
        ]
    },
    {
        "deporte": "Voleibol",
        "links": [
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/alemania-17"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/argentina-38"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/austria-8"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/brasil-33"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/corea-198"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/emiratos-%C3%A1rabes-unidos-219"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/espa%C3%B1a-28"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/filipinas-184"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/finlandia-15"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/francia-16"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/israel-62"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/italia-20"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/kazajist%C3%A1n-140"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/mongolia-164"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/norteam%C3%A9rica-9"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/per%C3%BA-59"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/polonia-22"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/portugal-37"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/rep%C3%BAblica-checa-12"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/ruman%C3%ADa-24"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/serbia-231"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/tailandia-210"
            ],
            [
                "https://sports.bwin.co/es/sports/voleibol-18/apuestas/turqu%C3%ADa-31"
            ]
        ]
    },
    {
        "deporte": "Vóley playa",
        "links": [
            [
                "https://sports.bwin.co/es/sports/v%C3%B3ley-playa-63/apuestas/mundo-6"
            ]
        ]
    },
    {
        "deporte": "Waterpolo",
        "links": [
            [
                "https://sports.bwin.co/es/sports/waterpolo-52/apuestas/italia-20"
            ]
        ]
    }
]
const  listData = [];
const pageDataBwin = async (Browser) =>{
    for(let item of Listalinks){
        console.log(item.deporte);
        const link = item.links;
        for(let element of link){
            const page = await Browser.newPage();
            await page.setViewport({ width: 1920, height: 1080 });

            await page.goto(element.toString());
            await new Promise(resolve => setTimeout(resolve, 4000));
            const DataPartido = await page.$$('.grid-event-wrapper.image');
            try{
                var titulo = await page.$eval('.league-heading-title', element => element.textContent);
            }catch(err){
                console.error('titulo no encontrado');
                continue;
            }

            
            // console.log(titulo)
            const listaActual =  await Promise.all(DataPartido.map( async (data)=>{
                return await data.evaluate(element=>{
                    let equipos = {
                        local:'',
                        visitante:''
                    }
                    let cuotas = {
                        local:'',
                        empate: '',
                        visitante:'',
                    }
                    // let cuotas = [];
                    let fecha
                    let hora
                    let contador = 0;
                    const  partido = (Array.from(element.querySelectorAll(`.participant-wrapper,
                                                                           .starting-time,
                                                                           .timer-badg,
                                                                           .grid-option-group`)));
                    partido.forEach(e =>{
                        if(e.classList.contains('participant-wrapper')){
                            if(equipos.local === ''){
                            equipos.local = e.textContent.trim();
                            }else{
                                equipos.visitante = e.textContent.trim();
                            }
                        }
                        if(e.classList.contains('starting-time')){
                            const input = e.textContent.trim();
                            const ahora = new Date();
                            if( input.includes('Hoy')){
                                fecha = `${ahora.getDate()}/${ahora.getMonth() + 1}/${ahora.getFullYear()}`;
                                hora = input.split('/')[1].trim();
                            }else{
                                const partes = input.split(' ');
                                fecha = partes[0];
                                hora = partes[1];
                            }
                        }
                        if(e.classList.contains('grid-option-group')&& contador === 0){
                            let grid = e.querySelectorAll('.grid-option');
                            const numCuotas = grid.length;
                                
                            for(let i of grid){
                                if(numCuotas === 3){
                                    if(cuotas.local===''){
                                        cuotas.local = i.textContent.trim();
                                    }
                                    else if(cuotas.visitante === '' && cuotas.empate === '' && cuotas.local !== ''){
                                        cuotas.empate = i.textContent.trim();
                                    } 
                                    else if(cuotas.local !== '' && cuotas.empate !== ''){
                                        cuotas.visitante = i.textContent.trim();
                                    }
                                }else{
                                    if(cuotas.local===''){
                                        cuotas.local = i.textContent.trim();
                                    }
                                     else{
                                        cuotas.visitante = i.textContent.trim();
                                    }
                                }
                                
                            }
                            contador++;
                        }
                    })
                    return {
                        equipos: equipos,
                        Cuotas: cuotas,
                        fecha: fecha,
                        hora: hora
                    }
                })
            }))
            titulo? listaActual.unshift({liga: titulo}): null;
            listaActual.unshift({deporte: item.deporte});
                    let deporte;
                    let liga;
                    let equipos;
                    let equipoLocal;
                    let equipoVisitante;
                    let fecha;
                    let hora;
                    let cuotas;
                    let cuotaLocal;
                    let cuotaEmpate;
                    let cuotaVisitante;
            const listaJson = listaActual.flatMap((element)=>{
                    deporte = element.deporte != undefined ? element.deporte : deporte;
                    liga = element.liga != undefined ? element.liga : liga;
                    equipos = element.equipos != undefined ? Object.values(element.equipos): 'no hay equipos';
                    equipoLocal = equipos[0];
                    equipoVisitante = equipos[1];
                    fecha = element.fecha != undefined ? element.fecha : fecha;
                    hora = element.hora != undefined ? element.hora : hora;
                    cuotas = element.Cuotas != undefined ? Object.values(element.Cuotas): 'no hay cuotas';
                    cuotas.length == 2 ? 
                    (cuotaLocal = cuotas[0], cuotaVisitante = cuotas[1]): cuotas.length == 3 ? 
                    (cuotaLocal = cuotas[0],cuotaEmpate = cuotas[1],cuotaVisitante= cuotas[2]
            ): 'error en las cuotas '
                    // cuotaLocal = cuotas['local'];
                    // cuotaEmpate = cuotas.empate || '';
                    // cuotaVisitante= cuotas.visitante;
                    if(deporte && liga && equipoLocal && equipoVisitante && fecha && 
                        hora && cuotaLocal && cuotaVisitante){
                            return new SportModel(deporte, liga, fecha, hora, equipoLocal, equipoVisitante,
                                cuotaLocal, cuotaVisitante,cuotaEmpate
                            )
                        }

            })
            listData.push(listaJson);
            await page.close();
            // break;
        }
        
    }

}

module.exports = {pageDataBwin, listData}