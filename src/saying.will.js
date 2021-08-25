module.exports = (L, fun) => ({
	ucw: () => {0
		const day = Math.ceil(
			(Date.now() - new Date("2021/07/31")) / (24 * 60 * 60 * 1000)
		)

		const state = "win"
		const saying = {
			away: `UCW 不在的第 ${day} 天` + "，想他".repeat(day),
			win: "UCWin is our red sun 🌞💗🌞",
			default: "UCW is our red sun 🌞🌞🌞"
		}

		return saying[state]
	},
	choco: () => {0
		if (L.msg.user_id !== 1302792181)
			return "你谁啊"
		return "qwq"
	},
	bhj: () => {2, "bohanjun", "博瀚君"
		const words = [
			"快去写 pisearch！！！！！！！！！！！！111111111111",
			"请叫我狗带户",
			"更好的浏览器主页👉https://pisearch.cn",
			"博瀚君の鸽子窝👉https://weibohan.com",
			"世界上最慢的（划）OJ👉https://oj.piterator.com",
			"适合初学者（大雾）的编程语言👉 https://piplus.plus",
		]
		return words[ Math.randt0(words.length) ]
	},
	o2: () => {0, "optimize_2" // O2 + C --burn-> CO2
	},
	undefined: () => {0
		return `Ψ: Command is undefined.`
	},
	fk: all => {0, "forkkillet", "ForkΨKILLET"
		const saying = `
			ｆｋ是一种神秘的生物。冥冥
			之中某种力量限制着你对他的
			了解。他的年龄是１．０００
			５ｅ１２岁。ｆｋ是ｃｈｏｃ
			ｏ的（）。住址在新海市红绿
			灯路，其他无可奉告。学习方
			面他并不擅长，但你可以通过
			ＯＩｅｒＤＢ找到一些线索。
			不过他目前就读于【数据删除
			】。ｆｋ的工作进度可以在ｐ
			ｒｏｊｅｃｔ命令中找到，因
			为他是我的编写者。如果你愿
			意探寻ｆｋ的意识深处，将会
			发现那里聚集着巨型而无法用
			常理解释，特征鲜明的物体，
			也被称作原质。将它们拆分开
			来是没有意义的，正如这段文
			字。在ｆｋ并不明了的未来中
			，于他最重要的，是陪伴他的
			人类、思维的创造和追寻真理
		`
			.padIndent(3)
			.trim()

		if (all === "!") {
			fun.access.req(4, "Needed lv >= 4 to see the complete saying")
			return saying
		}

		const words = saying
			.split("\n")
			.map(s => s.split(""))
		const mask = [
			[
				"             ",
				"             ",
				"      #      ",
				"     ###     ",
				"    #####    ",
				"   #######   ",
				"  #########  ",
				" ########### ",
				"  #########  ",
				"   #######   ",
				"    #####    ",
				"     ###     ",
				"      #      ",
				"    ##    ## ",
				"#  #  #  #  #",
				" ##    ##    ",
				"             ",
				"    ##    ## ",
				"#  #  #  #  #",
				" ##    ##    ",
			],
			[
				"             ",
				"     ###    #",
				"   ### #    #",
				" ###   #    #",
				" #     #    #",
				" #     #    #",
				" #     #    #",
				" #     #    #",
				" #     #    #",
				" #     #    #",
				" #     #    #",
				" #     #    #",
				" #     #    #",
				" #    ##    #",
				" #  ####  ###",
				" ####    ####",
				" ##   #######",
				"    #########",
				"             ",
				"             ",
			],
			[
				"             ",
				"      #      ",
				"      #      ",
				"      #      ",
				"  #   #   #  ",
				" # #  #  # # ",
				"   #  #  #   ",
				"   #  #  #   ",
				"   #  #  #   ",
				"   #  #  #   ",
				"    #####    ",
				"      #      ",
				"      #      ",
				"      #      ",
				"      #      ",
				"      #      ",
				"      #      ",
				"  #########  ",
				"             ",
				"             ",
			],
			[
				"             ",
				"  ##     ##  ",
				" ####   #### ",
				" ########### ",
				"  #########  ",
				"   #######   ",
				"    #####    ",
				"     ###     ",
				"      #      ",
				"             ",
				"             ",
				"      #      ",
				"             ",
				"             ",
				"      #      ",
				"      #      ",
				"     ###     ",
				"  #   #   #  ",
				"   #     #   ",
				"#############",
			],
			[
				"#############",
				"##  #   #  # ",
				"#            ",
				"#            ",
				"#          # ",
				"# #       #  ",
				"#          # ",
				"#            ",
				"#          # ",
				"# #       ## ",
				"# ##     ### ",
				"# ###   #### ",
				"# ####  #### ",
				"# ##    ##   ",
				"  #     #    ",
				"#    #       ",
				"#  ##        ",
				"##           ",
				" ## ## ## ## ",
				"             ",
			]
		]
		return mask[ Math.randt0(mask.length - 1) ]
			.map((s, i) => s
				.split("")
				.map((c, j) => c === "#"
					? words[i][j]
					: "　"
				)
				.join("")
			)
			.join("\n")
	}
})
