var mockDB = {
	clusters: [
		{
			id: "cluster_1",
			status: false,
			email: "cluster_1_admin@contrail.com",
			password: "admin",
			servers: [
				{
					id: "server_1_1",
					memory_gb: 1024,
					management_interface: "interface_1",
					role: "config",
					tags: [
						"tag1",
						"tag2"
					],
					installed_image: "linux",
					interfaces: [
						{
							id: "interface_1",
							ip_address: "123.176.23.8",
							mac_address: "243.1.23.1"
						},
						{
							id: "interface_2",
							ip_address: "173.176.23.8",
							mac_address: "183.152.23.1"
						},
						{
							id: "interface_3",
							ip_address: "123.231.23.28",
							mac_address: "222.10.23.1"
						}
					]
				},
				{
					id: "server_1_2",
					memory_gb: 2048,
					management_interface: "interface_21",
					role: "control",
					tags: [
						"tag1"
					],
					installed_image: "windows",
					interfaces: [
						{
							id: "interface_21",
							ip_address: "142.176.213.8",
							mac_address: "243.10.84.1"
						},
						{
							id: "interface_8",
							ip_address: "221.231.233.28",
							mac_address: "222.105.123.1"
						}
					]
				}
			]
		},
		{
			id: "cluster_2",
			status: true,
			email: "cluster_2_admin@contrail.com",
			password: "admin",
			servers: [
				{
					id: "server_2_1",
					memory_gb: 1024,
					management_interface: "interface_5",
					tags: [
						"tag4",
						"tag53"
					],
					installed_image: "linux",
					interfaces: [
						{
							id: "interface_7",
							ip_address: "234.176.252.8",
							mac_address: "188.123.23.1"
						},
						{
							id: "interface_5",
							ip_address: "169.73.1.185",
							mac_address: "163.122.5.206"
						}
					]
				}
			]
		}
	]
};