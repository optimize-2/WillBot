const fs = require("fs").promises

module.exports = (L, fun) => ({
	jrrp: {
		_: (f, man) => {0 // JinRi RenPin.
			const rp = ((L.sto.dice ??= {})[ L.msg.user_id ] ??= {}).jrrp ??= {}
			const jr = new Date
			if (f !== null && (
				rp.cleared ||
				! rp.t ||
				! Date.isSameDay(jr, new Date(rp.t))
			)) {
				rp.t = jr
				rp.p = typeof f === "number" ? f : Math.randto(100)
			}

			const reply = `${ L.msg.sender.nickname } 今天的人品是 ${rp?.p}`
			return man
				? reply + `～`
				: { reply, ...rp, rp }
		},
		nd: () => {0 // JinRi RenPin. (Normal Distribution)
			return fun.dice.jrrp._(fun.dice.r("5d20")).reply + `（正态分布 5d20）`
		},
		sd: async () => {0 // JinRi RenPin. (Senior Distribution)
			const fp = L.sto.dice_cfg?.sd_path
			if (! fp) return `Dice: Senior distribution table not found.`
			let table = fun.dice.jrrp.sd.table ??= (await fs.readFile(fp)).toString().split("\n")

			const { reply, p } = fun.dice.jrrp._()
			return reply + (table[p] ? " === " + table[p] + `（先辈分布）` : "！论证失败（悲）")
		},
		clear: bang => {2, "c" // Clear JinRi RenPin.
			if (bang = bang === "!") fun.access.req(
				3,
				"Needed lv >= 3 to completely clear JinRi RenPin."
			)
			; ((L.sto.dice ??= {})[L.msg.user_id] ??= {}).jrrp = bang ? null : {
				t: new Date,
				cleared: true
			}
			return `人品已重置，相信你不会刷人品的～`
		},
		top: () => {0, "*" // See JinRi RenPin Top list.
			const jr = new Date
			return Object.entries(L.sto.dice ?? {})
				.map(([ id, { jrrp: { t, p } } ]) => ({ id, t, p }))
				.filter(({ t }) => Date.isSameDay(jr, new Date(t)))
				.sort(({ p: p1 }, { p: p2 }) => p2 - p1)
				.map(({ id, p }, k, { length: l }) => String.padDiff(l, k) + `${k}. ${id}: ${p}`)
				.join("\n")
		},
	},
	r: (fmt, man) => {0 // Roll.
		const m = fmt.match(/^(?<time>\d+)?d(?<side>\d+)?$/)
		if (fmt && ! m) return "Dice: Expected [[time]?d[side]?]?"

		const { time = 1, side = 100 } = m?.groups ?? {}
		const p = []

		if (time > 20) return "Dice: Rejected for [time] > 20"
		if (side < 1) return "Dice: Rejected for [side] = 0"
		if (side > 100) return "Dice: Rejected for [side] > 100"

		for (let i = 0; i < time; i ++) p.push(Math.randto(+ side))
		const r = p.reduce((a, v) => a + v, 0)
		return man
			? `${ L.msg.sender.nickname } 掷骰：${time}d${side} = ${ p.join(" + ") }`
				+ (p.length > 1 ? " === " + r : "")
			: r
	},
	set: _ => {0, "st" // SeT skill point.
		if (! _.match(/^(([^\d\s][^\s]*?)\s*(\d+))+$/g))
			return "Dice: Expected [[name]<space>?[point]]+"

		const st = ((L.sto.dice ??= {})[ L.msg.user_id ] ??= {}).st ??= {}
		const n_new = [], n_upd = []
		for (const np of _.matchAll(/([^\d\s][^\s]*?)\s*(\d+)/g)) {
			const [, n, p ] = np
			; (n in st ? n_upd : n_new).push(n)
			st[n] = + p
		}
		return `${ L.msg.sender.nickname } 设置属性：`
			+ (n_new.length ? "（新建）" + n_new.join(", ") : "")
			+ (n_upd.length ? "（修改）" + n_upd.join(", ") : "")
	},
	get: (name, man) => {0, "gt" // GeT skill point.
		const p = L.sto.dice?.[ L.msg.user_id ]?.st?.[name]
		return man
			? `${ L.msg.sender.nickname } 查看属性：${name} ${ p ?? "（未设置）" }`
			: p
	},
	ra: _ => {0 // Roll Action.
		const m = _.match(/^(\S*)\s*(\d+)?$/)
		if (! m) return "Dice: Expected [name]<space>*[point]?"

		const [, n, mp ] = m
		const sp = L.sto.dice?.[ L.msg.user_id ]?.st?.[n]
		const pn = !! mp + (typeof sp === "number")
		switch (pn) {
		case 0:
			return `Dice: Rejected for no [point] when not "st"ed`
		case 2:
			return `Dice: Rejected for [point] when "st"ed`
		case 1:
			const p = sp ?? mp
			if (p > 110 || p < - 10) return `Dice: Rejected for abnormal points.`
			const p2 = Math.floor(p / 2), p5 = Math.floor(p / 5)
			const rp = fun.dice.r("")
			return `${ L.msg.sender.nickname } 掷骰 ${n}：d100 = ${rp} / ${p}`
				+ (rp > p
					? (p > 50 && rp > 95 || rp > 99 ? "，大失败！" : "，失败")
					: ""
				)
				+ (rp <= p && rp > p2 ? "，普通成功" : "")
				+ (rp <= p2 && rp > p5 ? "，困难成功" : "")
				+ (rp <= p5 && rp > 5 ? "，极难成功" : "")
				+ (rp < 6 ? "，大成功！" : "")
		}
	}
})
