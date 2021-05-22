

#### 我的本地文件：

 [mac](/Users/ccc/Desktop/frp/frp)

 [vps nas](/Users/ccc/Desktop/frp/frp_vps)





#### 配置

frpc.ini

```ini
[common]
bind_port = 7000
vhost_http_port = 80
token = 93883654
```



frcp.ini

```ini
[common]
server_addr = 149.28.33.227
server_port = 7000
token = 93883654

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 6000
custom_domains = www.sys.chenxianwei.icu

[web]
type = http
local_ip = 127.0.0.1
local_port = 5000   
custom_domains = www.web.chenxianwei.icu  
```

remote_port  远程访问的端口，即加在域名后面

local_port = 5000   本地端口





#### 运行脚本

服务端运行

```bash
nohup /root/frp_vps/frps -c /root/frp_vps/frps.ini  &
```



nas脚本

```shell
nohup /var/services/cxw/frp/frpc -c /var/services/cxw/frp/frpc.ini  &
nohup /volume1/cxw/frp/frpc -c /volume1/cxw/frp/frpc.ini  &
```

ps -fe | grep frp



#### Ds file与Ds video加80端口

www.web.chenxianwei.icu:80