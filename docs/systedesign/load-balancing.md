# Load Balancing (Балансировка нагрузки)

Load Balancing — это распределение входящего трафика между несколькими серверами для обеспечения высокой доступности, масштабируемости и производительности системы.

---

## 🔹 Зачем нужен Load Balancer?

### Проблемы без балансировщика

* **Single Point of Failure**: падение одного сервера → падение всей системы
* **Ограниченная пропускная способность**: один сервер не справится с высокой нагрузкой
* **Неравномерная нагрузка**: один сервер перегружен, другой простаивает
* **Сложность масштабирования**: нужно менять DNS при добавлении серверов

### Преимущества Load Balancer

* **Высокая доступность**: при падении одного сервера остальные продолжают работать
* **Масштабируемость**: легко добавлять новые серверы
* **Равномерное распределение нагрузки**
* **Географическое распределение**: маршрутизация к ближайшему дата-центру

---

## 🔹 Типы Load Balancing

### 1. Layer 4 (Transport Layer) — по IP и порту

Балансировщик работает на уровне TCP/UDP, не анализируя содержимое запроса.

**Примеры**: AWS Network Load Balancer, HAProxy (mode tcp)

**Плюсы**:
* Быстро (низкая latency)
* Простая конфигурация
* Подходит для любого протокола

**Минусы**:
* Не может маршрутизировать по содержимому запроса
* Не знает о состоянии приложения

**Когда использовать**:
* Высокая нагрузка (миллионы соединений)
* Нужна максимальная производительность
* TCP/UDP протоколы

### 2. Layer 7 (Application Layer) — по содержимому запроса

Балансировщик анализирует HTTP-запросы (URL, заголовки, cookies).

**Примеры**: AWS Application Load Balancer, Nginx, HAProxy (mode http)

**Плюсы**:
* Умная маршрутизация (по пути, заголовкам)
* SSL termination (расшифровка на балансировщике)
* Content-based routing
* Health checks на уровне приложения

**Минусы**:
* Медленнее Layer 4
* Больше нагрузка на балансировщик

**Когда использовать**:
* HTTP/HTTPS приложения
* Нужна маршрутизация по пути (микросервисы)
* SSL termination

---

## 🔹 Алгоритмы балансировки

### 1. Round Robin (По кругу)

Запросы распределяются по очереди между серверами.

```
Запрос 1 → Сервер A
Запрос 2 → Сервер B
Запрос 3 → Сервер C
Запрос 4 → Сервер A (цикл повторяется)
```

**Плюсы**: Простота, равномерное распределение

**Минусы**: Не учитывает нагрузку серверов

**Когда использовать**: Серверы одинаковой мощности

### 2. Weighted Round Robin (Взвешенный Round Robin)

Серверы получают веса, более мощные получают больше запросов.

```
Сервер A (вес 3) → 3 запроса
Сервер B (вес 2) → 2 запроса
Сервер C (вес 1) → 1 запрос
```

**Плюсы**: Учитывает мощность серверов

**Минусы**: Статическая конфигурация

**Когда использовать**: Серверы разной мощности

### 3. Least Connections (Наименьшее число соединений)

Запрос направляется на сервер с наименьшим числом активных соединений.

**Плюсы**: Учитывает текущую нагрузку

**Минусы**: Не учитывает производительность серверов

**Когда использовать**: Долгие соединения (WebSocket, long polling)

### 4. Least Response Time (Наименьшее время отклика)

Запрос направляется на сервер с наименьшим временем отклика.

**Плюсы**: Оптимальное распределение

**Минусы**: Требует измерения времени отклика

**Когда использовать**: Когда важна производительность

### 5. IP Hash (Хеш по IP)

IP-адрес клиента хешируется, запрос всегда идёт на один сервер.

```
hash(client_ip) % N → сервер
```

**Плюсы**: Sticky sessions (сессия на одном сервере)

**Минусы**: Неравномерное распределение (если IP-адреса не случайны)

**Когда использовать**: Нужны sticky sessions, нет shared session storage

### 6. Geographic (Географическая)

Маршрутизация к ближайшему дата-центру по геолокации клиента.

**Плюсы**: Низкая latency

**Минусы**: Сложная настройка

**Когда использовать**: Глобальное приложение

---

## 🔹 Sticky Sessions (Привязка сессии)

### Проблема

Без sticky sessions запросы одного пользователя могут попадать на разные серверы, что ломает сессии, хранящиеся в памяти сервера.

### Решения

#### 1. Sticky Sessions (Session Affinity)

Все запросы одного пользователя идут на один сервер.

**Реализация**:
* IP Hash
* Cookie-based routing

**Плюсы**: Простота

**Минусы**:
* Неравномерная нагрузка
* При падении сервера теряются сессии

#### 2. Shared Session Storage (Рекомендуется)

Сессии хранятся в Redis/Memcached, доступны всем серверам.

```
┌─────────┐
│ Сервер A│ ──┐
└─────────┘   │
              ├──→ Redis (сессии)
┌─────────┐   │
│ Сервер B│ ──┘
└─────────┘
```

**Плюсы**:
* Равномерная нагрузка
* Отказоустойчивость
* Масштабируемость

**Минусы**: Дополнительная зависимость (Redis)

**Рекомендация**: Используйте shared session storage вместо sticky sessions.

---

## 🔹 Health Checks (Проверка здоровья)

Load Balancer периодически проверяет доступность серверов.

### Типы проверок

#### 1. TCP Check

Проверяет, открыт ли порт.

```nginx
health_check {
    type tcp
    port 80
    interval 10s
    timeout 3s
    fail_threshold 3
}
```

#### 2. HTTP Check

Отправляет HTTP-запрос и проверяет статус.

```nginx
health_check {
    type http
    path /health
    expected_status 200
    interval 10s
}
```

#### 3. Application-Level Check

Проверяет состояние приложения (БД, кэш).

```python
@app.route('/health')
def health():
    # Проверяем БД
    db_status = check_database()
    # Проверяем Redis
    cache_status = check_redis()
    
    if db_status and cache_status:
        return {'status': 'healthy'}, 200
    else:
        return {'status': 'unhealthy'}, 503
```

---

## 🔹 Архитектура с Load Balancer

### Базовая архитектура

```
                    ┌─────────────┐
                    │   Клиенты    │
                    └──────┬───────┘
                           │
                           ↓
                    ┌─────────────┐
                    │Load Balancer│
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
  ┌─────────┐       ┌─────────┐       ┌─────────┐
  │Сервер A │       │Сервер B │       │Сервер C │
  └─────────┘       └─────────┘       └─────────┘
```

### С несколькими уровнями

```
                    ┌─────────────┐
                    │   Клиенты    │
                    └──────┬───────┘
                           │
                           ↓
              ┌────────────────────┐
              │  External LB        │
              │  (Public-facing)   │
              └──────────┬─────────┘
                         │
                         ↓
              ┌────────────────────┐
              │  Internal LB        │
              │  (Application LB)   │
              └──────────┬─────────┘
                         │
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
  ┌─────────┐     ┌─────────┐     ┌─────────┐
  │API Server│    │API Server│    │API Server│
  └─────────┘     └─────────┘     └─────────┘
```

---

## 🔹 Примеры конфигурации

### Nginx

```nginx
upstream backend {
    least_conn;  # Алгоритм: наименьшее число соединений
    
    server 10.0.1.10:8080 weight=3;
    server 10.0.1.11:8080 weight=2;
    server 10.0.1.12:8080 weight=1 backup;  # Резервный
    
    # Health check
    keepalive 32;
}

server {
    listen 80;
    
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        
        # Health check endpoint
        proxy_next_upstream error timeout invalid_header http_500;
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

### HAProxy

```haproxy
global
    log /dev/log local0
    maxconn 4096

defaults
    mode http
    timeout connect 5000ms
    timeout client 50000ms
    timeout server 50000ms

frontend http-in
    bind *:80
    default_backend servers

backend servers
    balance roundrobin
    option httpchk GET /health
    
    server web1 10.0.1.10:8080 check
    server web2 10.0.1.11:8080 check
    server web3 10.0.1.12:8080 check backup
```

### AWS Application Load Balancer

```yaml
# CloudFormation / Terraform
Resources:
  ApplicationLoadBalancer:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Type: application
      Scheme: internet-facing
      Subnets:
        - subnet-12345
        - subnet-67890
      SecurityGroups:
        - sg-abc123
      
  TargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      Port: 8080
      Protocol: HTTP
      VpcId: vpc-12345
      HealthCheckPath: /health
      HealthCheckIntervalSeconds: 30
      HealthCheckTimeoutSeconds: 5
      HealthyThresholdCount: 2
      UnhealthyThresholdCount: 3
```

---

## 🔹 SSL Termination

### Что это?

Расшифровка SSL/TLS на Load Balancer, а не на серверах приложения.

```
Клиент → [HTTPS] → Load Balancer → [HTTP] → Серверы
```

### Преимущества

* **Снижение нагрузки на серверы**: расшифровка на балансировщике
* **Централизованное управление сертификатами**
* **Простота масштабирования**: серверы не знают про SSL

### Недостатки

* **Дополнительная точка отказа**: если LB падает
* **Задержка**: дополнительный хоп

---

## 🔹 Best Practices

1. **Используйте health checks**: автоматическое исключение неработающих серверов
2. **Избегайте sticky sessions**: используйте shared session storage
3. **Мониторьте метрики**: latency, error rate, throughput — см. [Метрики и мониторинг](./metrics.md)
4. **Используйте несколько уровней**: внешний LB + внутренний LB
5. **Географическое распределение**: маршрутизация к ближайшему региону
6. **Graceful shutdown**: дайте серверу завершить текущие запросы перед остановкой
7. **Rate limiting**: защита от DDoS на уровне LB

---

---

## Навигация

[← Предыдущая: Масштабирование](./scaling.md) | [Следующая: Стратегии кэширования →](./caching-strategies.md)

